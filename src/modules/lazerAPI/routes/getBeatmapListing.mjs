// Licensed under GPL v3 - Check Repository Root for full License notice.
// osu!Hikaru, a fully independent osu!Lazer Private Server backend.
// Copyright (C) 2023 Hikaru Team <copyright@hikaru.pw>

import axios from "axios";

const logger = global.logger;

export default async (lazerToken, qs) => {
  return new Promise(async (resolve, reject) => {
    try {
      logger.info("lazertap", "Retrieving beatmap listing...");

      axios({
        method: "get",
        url: "https://osu.ppy.sh/api/v2/beatmapsets/search?" + qs,
        headers: {
          Authorization: "Bearer " + lazerToken,
        },
      })
        .then((res) => {
          res.type = "api";

          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (err) {
      reject(err);

      logger.error("lazertap", err);
    }
  });
};
