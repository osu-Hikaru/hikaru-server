// Licensed under GPL v3 - Check Repository Root for full License notice.
// osu!Hikaru, a fully independent osu!Lazer Private Server backend.
// Copyright (C) 2021 Hikaru Team <copyright@hikaru.pw>

import axios from "axios";
import FormData from "form-data";
import fs from "fs";
import * as modules from "../index.mjs";
import process from "process";

export default async () => {
  try {
    console.log("Running osu!LazerAuthorization...");

    let config = JSON.parse(
      await fs.readFileSync("./src/config.json", "utf-8", () => { })
    );
    const data = new FormData();

    data.append("username", config.lazer.username);
    data.append("password", config.lazer.password);
    data.append("grant_type", "password");
    data.append("client_id", config.lazer.client_id);
    data.append("client_secret", config.lazer.client_secret);
    data.append("scope", "*");

    axios({
      method: "post",
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
        config.lazer.bearer = res.data.access_token;
        config.lazer.expires_in = res.data.expires_in;
        config.lazer.date_created = Date.now();
        await fs.writeFile(process.cwd() + "/src/config.json", JSON.stringify(config), () => {
          console.log("osu!LazerAuthorization: Success!");
          setTimeout(modules.oapiLazerAuthorization, 1000 * res.data.expires_in);
        });
      })
      .catch((error) => {
        console.log("osu!LazerAuthorization: Failure! Retrying in 10 seconds...");
        console.log(error);
        setTimeout(modules.oapiLazerAuthorization, 1000 * 10);
      });
  } catch (e) {
    console.log(e)
  }

};
