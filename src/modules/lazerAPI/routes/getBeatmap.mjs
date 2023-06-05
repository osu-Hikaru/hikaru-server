// Licensed under GPL v3 - Check Repository Root for full License notice.
// osu!Hikaru, a fully independent osu!Lazer Private Server backend.
// Copyright (C) 2023 Hikaru Team <copyright@hikaru.pw>

import axios from "axios";

const logger = global.logger;
const resolver = global.resolver;

export default async (lazerToken, id, checksum) => {
  logger.debug(
    "lazertap",
    "Looking up beatmap... ID: " + id + " | Checksum: " + checksum
  );

  return new Promise(async (resolve, reject) => {
    try {
      let url = "https://osu.ppy.sh/api/v2/beatmaps/lookup?";

      if (id !== null) {
        url += `id=${id}&`;
      }

      if (checksum !== null) {
        url += `checksum=${checksum}&`;
      }

      axios({
        method: "get",
        url: url.slice(0, -1),
        headers: {
          Authorization: "Bearer " + lazerToken,
        },
      })
        .then(async (res) => {
          resolve(res);
        })
        .catch(async (error) => {
          reject(error);
        });
    } catch (e) {}
  });
};
