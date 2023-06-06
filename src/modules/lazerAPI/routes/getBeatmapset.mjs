// Licensed under GPL v3 - Check Repository Root for full License notice.
// osu!Hikaru, a fully independent osu!Lazer Private Server backend.
// Copyright (C) 2023 Hikaru Team <copyright@hikaru.pw>

import axios from "axios";

const database = global.database;
const logger = global.logger;

export default async (lazerToken, id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (id === undefined) {
        reject("ID has to be defined");
      } else {
        logger.info("lazertap", "Looking up beatmapset... ID: " + id);

        const beatmapsetQuery = await database.runQuery(
          "SELECT * FROM beatmapsets WHERE id = ?",
          [Number(id)]
        );

        if (beatmapsetQuery[0] !== undefined) {
          logger.info("lazertap", "Returning database record...");

            let returnData = beatmapsetQuery[0];

            delete returnData.cover_id

          resolve({
            data: {
              ...returnData,
              covers: {
                cover: `https://assets.ppy.sh/beatmaps/${returnData.id}/covers/cover.jpg?${beatmapsetQuery[0].cover_id}`,
                "cover@2x": `https://assets.ppy.sh/beatmaps/${returnData.id}/covers/cover@2x.jpg?${beatmapsetQuery[0].cover_id}`,
                card: `https://assets.ppy.sh/beatmaps/${returnData.id}/covers/card.jpg?${beatmapsetQuery[0].cover_id}`,
                "card@2x": `https://assets.ppy.sh/beatmaps/${returnData.id}/covers/card@2x.jpg?${beatmapsetQuery[0].cover_id}`,
                list: `https://assets.ppy.sh/beatmaps/${returnData.id}/covers/list.jpg?${beatmapsetQuery[0].cover_id}`,
                "list@2x": `https://assets.ppy.sh/beatmaps/${returnData.id}/covers/list@2x.jpg?${beatmapsetQuery[0].cover_id}`,
                slimcover: `https://assets.ppy.sh/beatmaps/${returnData.id}/covers/slimcover.jpg?${beatmapsetQuery[0].cover_id}`,
                "slimcover@2x": `https://assets.ppy.sh/beatmaps/${returnData.id}/covers/slimcover@2x.jpg?${beatmapsetQuery[0].cover_id}`,
              },
              creator: "Guest",
              favourite_count: 0,
              hype: null,
              play_count: 0,
              preview_url: `//b.ppy.sh/preview/${returnData.id}.mp3`,
              source: "",
              spotlight: false,
              track_id: null,
              user_id: 1,
              can_be_hyped: false,
              deleted_at: null,
              discussion_enabled: false,
              discussion_locked: false,
              is_scoreable: true,
              legacy_thread_url: "",
              nominations_summary: { current: 0, required: 5 },
              tags: "",
              availability: {
                download_disabled: false,
                more_information: null,
              },
              has_favourited: false,
              beatmaps: [],
              converts: [],
              current_nominations: [],
              description: {
                description: "",
              },
              genre: { id: 1, name: "Unspecified" },
              language: { id: 1, name: "English" },
              pack_tags: [],
              ratings: [],
              recent_favourites: [],
              related_users: [],
              user: {
                avatar_url: "https://a.hikaru.pw/1/default_av.jpg",
                country_code: "DE",
                default_group: "default",
                id: 1,
                is_active: true,
                is_bot: false,
                is_deleted: false,
                is_online: false,
                is_supporter: true,
                last_visit: "2022-01-01 20:00:00",
                pm_friends_only: false,
                profile_colour: null,
                username: "Guest",
              },
              type: "database",
            },
          });
        } else {
          logger.info("lazertap", "Fetching from API...");

          axios({
            method: "GET",
            url: "https://osu.ppy.sh/api/v2/beatmapsets/" + id,
            headers: {
              Authorization: "Bearer " + lazerToken,
            },
          })
            .then(async (res) => {
              res.type = "api";

              let databaseInsertData = {
                artist: String(res.data.artist),
                artist_unicode: String(res.data.artist_unicode),
                cover_id: Number(res.data.covers.cover.split("?")[1]),
                id: Number(res.data.id),
                nsfw: Number(res.data.nsfw),
                offset: Number(res.data.offset),
                status: String(res.data.status),
                title: String(res.data.title),
                title_unicode: String(res.data.title_unicode),
                video: Number(res.data.video),
                bpm: Number(res.data.bpm),
                last_updated: String(res.data.last_updated),
                ranked: Number(res.data.ranked),
                ranked_date: String(res.data.ranked_date),
                storyboard: Number(res.data.storyboard),
                submitted_date: String(res.data.submitted_date),
              };

              const insertQuery = database.generateSQLInsertQuery(
                "beatmapsets",
                databaseInsertData
              );

              await database.runQuery(insertQuery.query, insertQuery.values);

              let coverID = databaseInsertData.cover_id;

              delete databaseInsertData.cover_id;

              resolve({
                data: {
                  ...databaseInsertData,
                  covers: {
                    cover: `https://assets.ppy.sh/beatmaps/${databaseInsertData.id}/covers/cover.jpg?${coverID}`,
                    "cover@2x": `https://assets.ppy.sh/beatmaps/${databaseInsertData.id}/covers/cover@2x.jpg?${coverID}`,
                    card: `https://assets.ppy.sh/beatmaps/${databaseInsertData.id}/covers/card.jpg?${coverID}`,
                    "card@2x": `https://assets.ppy.sh/beatmaps/${databaseInsertData.id}/covers/card@2x.jpg?${coverID}`,
                    list: `https://assets.ppy.sh/beatmaps/${databaseInsertData.id}/covers/list.jpg?${coverID}`,
                    "list@2x": `https://assets.ppy.sh/beatmaps/${databaseInsertData.id}/covers/list@2x.jpg?${coverID}`,
                    slimcover: `https://assets.ppy.sh/beatmaps/${databaseInsertData.id}/covers/slimcover.jpg?${coverID}`,
                    "slimcover@2x": `https://assets.ppy.sh/beatmaps/${databaseInsertData.id}/covers/slimcover@2x.jpg?${coverID}`,
                  },
                  creator: "Guest",
                  favourite_count: 0,
                  hype: null,
                  play_count: 0,
                  preview_url: `//b.ppy.sh/preview/${databaseInsertData.id}.mp3`,
                  source: "",
                  spotlight: false,
                  track_id: null,
                  user_id: 1,
                  can_be_hyped: false,
                  deleted_at: null,
                  discussion_enabled: false,
                  discussion_locked: false,
                  is_scoreable: true,
                  legacy_thread_url: "",
                  nominations_summary: { current: 0, required: 5 },
                  tags: "",
                  availability: {
                    download_disabled: false,
                    more_information: null,
                  },
                  has_favourited: false,
                  beatmaps: [],
                  converts: [],
                  current_nominations: [],
                  description: {
                    description: "",
                  },
                  genre: { id: 1, name: "Unspecified" },
                  language: { id: 1, name: "English" },
                  pack_tags: [],
                  ratings: [],
                  recent_favourites: [],
                  related_users: [],
                  user: {
                    avatar_url: "https://a.hikaru.pw/1/default_av.jpg",
                    country_code: "DE",
                    default_group: "default",
                    id: 1,
                    is_active: true,
                    is_bot: false,
                    is_deleted: false,
                    is_online: false,
                    is_supporter: true,
                    last_visit: "2022-01-01 20:00:00",
                    pm_friends_only: false,
                    profile_colour: null,
                    username: "Guest",
                  },
                  type: "api",
                },
              });
            })
            .catch(async (error) => {
              reject(error);
            });
        }
      }
    } catch (err) {
      reject(err);

      logger.error("lazertap", err);
    }
  });
};
