// Licensed under GPL v3 - Check Repository Root for full License notice.
// osu!Hikaru, a fully independent osu!Lazer Private Server backend.
// Copyright (C) 2023 Hikaru Team <copyright@hikaru.pw>

import axios from "axios";

const database = global.database;
const logger = global.logger;

export default async (lazerToken, id, filename, checksum) => {
  logger.info(
    "lazertap",
    "Looking up beatmap... ID: " +
      id +
      " | Filename: " +
      filename +
      " | Checksum: " +
      checksum
  );

  let queryParameters = {};

  if (id !== undefined) {
    queryParameters.id = id;
  }

  if (checksum !== undefined) {
    queryParameters.checksum = checksum;
  }

  return new Promise(async (resolve, reject) => {
    try {
      const selectQuery = database.generateSQLSelectQuery(
        "beatmaps",
        queryParameters
      );

      let dbResult = await database.runQuery(
        selectQuery.query + " ORDER BY `last_updated` ASC LIMIT 1",
        selectQuery.values
      );

      if (dbResult[0] !== undefined) {
        logger.info("lazertap", "Returning Database record...");

        let returnRecord = { data: dbResult[0] };

        returnRecord.data.failtimes = { fail: [], exit: [] };
        returnRecord.data.beatmapset = {
          artist: "",
          artist_unicode: "",
          covers: {
            cover: "",
            "cover@2x": "",
            card: "",
            "card@2x": "",
            list: "",
            "list@2x": "",
            slimcover: "",
            "slimcover@2x": "",
          },
          creator: "",
          favourite_count: 0,
          hype: null,
          id: 0,
          nsfw: false,
          offset: 0,
          play_count: 0,
          preview_url: "",
          source: "",
          spotlight: false,
          status: "",
          title: "",
          title_unicode: "",
          track_id: null,
          user_id: 0,
          video: false,
          bpm: 0,
          can_be_hyped: false,
          deleted_at: null,
          discussion_enabled: true,
          discussion_locked: false,
          is_scoreable: true,
          last_updated: "",
          legacy_thread_url: "",
          nominations_summary: { current: 0, required: 0 },
          ranked: 0,
          ranked_date: "",
          storyboard: false,
          submitted_date: "",
          tags: "",
          availability: { download_disabled: false, more_information: null },
          has_favourited: false,
          ratings: [],
        };

        returnRecord.type = "database";

        resolve(returnRecord);
      } else {
        logger.info("lazertap", "Fetching from API...");

        let url = "https://osu.ppy.sh/api/v2/beatmaps/lookup?";

        if (id !== null) {
          url += `id=${id}&`;
        }

        if (filename !== null) {
          url += `filename=${filename}&`;
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
            res.type = "api";

            resolve(res);
          })
          .catch(async (error) => {
            reject(error);
          });
      }
    } catch (err) {
      reject(err);

      logger.error("lazertap", err);
    }
  });
};
