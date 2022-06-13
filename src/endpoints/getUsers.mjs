// Licensed under GPL v3 - Check Repository Root for full License notice.
// osu!Hikaru, a fully independent osu!Lazer Private Server backend.
// Copyright (C) 2021 Hikaru Team <copyright@hikaru.pw>

import * as modules from "../index.mjs";

export default async (pool, req, res) => {
  const conn = await pool.getConnection();
  const url = req.originalUrl.split("/");
  let req_type = "user_id";

  try {
    if (req.query.key === "id") {
      req_type = "user_id";
    } else if (req.query.key === "username") {
      req_type = "username";
    } else {
      res.status(400);
      res.send();
      conn.end();
      return;
    }

    let modeObj = await modules.resolveModeByName(url[4].split("?")[0]);

    let user = await conn.query(`SELECT * FROM users WHERE ${req_type} = ?`, [
      Number(url[3]),
    ]);

    let user_mode = await conn.query(
      `SELECT * FROM users_? WHERE user_id = ? LIMIT 1`,
      [Number(modeObj.mode_int), Number(user[0].user_id)]
    );

    const groups = [];
    const promises = [];
    let groupLength;
    let i = 0;

    if (user[0].groups !== null) {
      groupLength = user[0].groups.split(",").length;

      await user[0].groups.split(",").forEach(async (group) => {
        promises.push(
          new Promise(async (resolve, reject) => {
            await conn
              .query(`SELECT * FROM groups WHERE identifier = ?`, [group])
              .then((dbResGroups) => {
                dbResGroups[0];
                resolve(
                  groups.push({
                    id: Number(dbResGroups[0].group_id),
                    identifier: String(dbResGroups[0].identifier),
                    name: String(dbResGroups[0].name),
                    short_name: String(dbResGroups[0].short_name),
                    playmodes: dbResGroups[0].playmodes,
                    has_playmodes: Boolean(dbResGroups[0].has_playmodes),
                    has_listing: Boolean(dbResGroups[0].has_listing),
                    is_probationary: Boolean(dbResGroups[0].is_probationary),
                    colour: String("#" + dbResGroups[0].colour),
                  })
                );
              })
              .catch((err) => {
                reject(err);
                return;
              });
          })
        );
        i++;
      });
    } else {
      groupLength = 0;
    }

    async function processPromises() {
      if (i === groupLength) {
        await Promise.all(promises)
          .then(async (resolved) => {
            let response = {
              avatar_url: String(user[0].avatar_url),
              country_code: String(user[0].country_code),
              default_group: "default",
              id: Number(user[0].user_id),
              is_active: Boolean(user[0].is_active),
              is_bot: Boolean(user[0].is_bot),
              is_deleted: Boolean(user[0].is_deleted),
              is_online: Boolean(user[0].is_online),
              is_supporter: Boolean(user[0].is_supporter),
              last_visit: String(new Date(user[0].last_visit).toISOString()),
              pm_friends_only: false,
              profile_colour: null,
              username: String(user[0].username),
              cover_url: "https://a.hikaru.pw/1/default_cv.jpg",
              discord: null,
              has_supported: Boolean(user[0].has_supported),
              interests: null,
              join_date: String(new Date(user[0].join_date).toISOString()),
              kudosu: {
                total: 0,
                available: 0,
              },
              location: null,
              max_blocks: 50,
              max_friends: 250,
              occupation: null,
              playmode: String(modeObj.mode),
              playstyle: null,
              post_count: 0,
              profile_order: [
                "me",
                "recent_activity",
                "top_ranks",
                "medals",
                "historical",
                "beatmaps",
                "kudosu",
              ],
              title: null,
              title_url: null,
              twitter: null,
              website: null,
              country: {
                code: String(user[0].country_code),
                name: String(user[0].country_name),
              },
              cover: {
                custom_url: null,
                url: "https://a.hikaru.pw/1/default_cv.jpg",
                id: "4",
              },
              account_history: [],
              active_tournament_banner: null,
              badges: [],
              beatmap_playcounts_count: 0,
              comments_count: 0,
              favourite_beatmapset_count: 0,
              follower_count: 1,
              graveyard_beatmapset_count: 0,
              groups: groups,
              loved_beatmapset_count: 0,
              mapping_follower_count: 0,
              monthly_playcounts: [],
              page: {
                html: "",
                raw: "",
              },
              pending_beatmapset_count: 0,
              previous_usernames: [],
              ranked_beatmapset_count: 0,
              replays_watched_counts: [],
              scores_best_count: 0,
              scores_first_count: 0,
              scores_recent_count: 0,
              statistics: {
                level: {
                  current: 1,
                  progress: 0,
                },
                global_rank: Number(user_mode[0].global_rank),
                pp: Number(user_mode[0].pp),
                ranked_score: 0,
                hit_accuracy: 0,
                play_count: Number(user_mode[0].playcount),
                play_time: Number(user_mode[0].play_time),
                total_score: Number(user_mode[0].total_score),
                total_hits: Number(user_mode[0].total_hits),
                maximum_combo: 0,
                replays_watched_by_others: 0,
                is_ranked: false,
                grade_counts: {
                  ss: 0,
                  ssh: 0,
                  s: 0,
                  sh: 0,
                  a: 0,
                },
                rank: {
                  country: null,
                },
              },
              support_level: 0,
              user_achievements: [],
              rankHistory: null,
              rank_history: null,
              ranked_and_approved_beatmapset_count: 0,
              unranked_beatmapset_count: 0,
            };

            console.log(response)
            res.status(200);
            res.json(response);
            conn.end();
            return;
          })
          .catch((err) => {
            console.log(err);
            res.status(500);
            res.send();
            conn.end();
            return;
          });
      } else {
        setTimeout(processPromises, 250);
      }
    }
    processPromises();
  } catch (err) {
    conn.end();
    console.log(err);
    res.status(500);
    res.send();
    conn.end();
    return;
  }
};
