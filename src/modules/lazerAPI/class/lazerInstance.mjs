// Licensed under GPL v3 - Check Repository Root for full License notice.
// osu!Hikaru, a fully independent osu!Lazer Private Server backend.
// Copyright (C) 2023 Hikaru Team <copyright@hikaru.pw>

import axios from "axios";
import FormData from "form-data";

const logger = global.logger;
const resolver = global.resolver;

export default class {
  #lazerAuthorizationToken;
  #lazerTokenExpiry;
  #lazerTokenCreationDate;
  #lazerAvailable = undefined;

  constructor() {
    if (
      process.env.LAZER_USERNAME === undefined ||
      process.env.LAZER_PASSWORD === undefined ||
      process.env.LAZER_CLIENT_ID === undefined ||
      process.env.LAZER_CLIENT_SECRET === undefined
    ) {
      this.#lazerAvailable = false;
      logger.warn(
        "lazertap",
        "Missing required Lazer authorization parameter. The server will run at a limited featureset."
      );
    } else {
      this.#lazerAuthorizationToken = this.#authorizeLazer();
    }
  }

  #authorizeLazer() {
    logger.debug("lazertap", "Authorizing Lazer...");

    const data = new FormData();

    data.append("username", process.env.LAZER_USERNAME);
    data.append("password", process.env.LAZER_PASSWORD);
    data.append("grant_type", "password");
    data.append("client_id", process.env.LAZER_CLIENT_ID);
    data.append("client_secret", process.env.LAZER_CLIENT_SECRET);
    data.append("scope", "*");

    try {
      axios({
        method: "POST",
        url: "https://osu.ppy.sh/oauth/token",
        headers: {
          Accept: "application/json",
          "Accept-Encoding": "gzip, deflate",
          "User-Agent": "osu!",
          ...data.getHeaders(),
        },
        data: data,
      })
        .then(async (res) => {
          logger.debug("lazertap", "Authorization success!");

          this.#lazerAuthorizationToken = res.data.access_token;
          this.#lazerTokenExpiry = res.data.expires_in;
          this.#lazerTokenCreationDate = Date.now();

          this.#lazerAvailable = true;

          setTimeout(() => {
            this.#authorizeLazer();
          }, 1000 * this.#lazerTokenExpiry);
        })
        .catch((err) => {
          this.#lazerAvailable = false;

          logger.warn(
            "lazertap",
            "Authorization failed! Retrying in 10 Seconds..."
          );

          console.log(err);

          setTimeout(() => {
            this.#authorizeLazer();
          }, 1000 * 10);
        });
    } catch (e) {
      logger.error("lazertap", e);
    }
  }

  async getBeatmap(id, checksum) {
    let getBeatmapFunction = await resolver.resolveDict(
      "modules.lazerAPI.routes.getBeatmap"
    );

    return await getBeatmapFunction(this.getLazerAuthToken(), id, checksum);
  }

  getLazerAuthToken() {
    return this.#lazerAuthorizationToken;
  }

  getLazerFeatureAvailability() {
    logger.warn(
      "lazertap",
      "Requested Lazer Availability: " + this.#lazerAvailable
    );

    return this.#lazerAvailable;
  }
}
