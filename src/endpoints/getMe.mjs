// Licensed under GPL v3 - Check Repository Root for full License notice.
// osu!Hikaru, a fully independent osu!Lazer Private Server backend.
// Copyright (C) 2021 Hikaru Team <copyright@hikaru.pw>

export default async (pool, req, res) => {
  const conn = await pool.getConnection();

  if (req.headers.authorization === undefined) {
    res.status(401);
    res.send();
    conn.end();
    return;
  } else {
    await conn
      .query(`SELECT * FROM active_tokens WHERE access_token = ? LIMIT 1`, [
        req.headers.authorization.split(" ")[1],
      ])
      .then((dbRes) => {
        if (
          dbRes[0] === undefined ||
          dbRes[0].created_at + dbRes[0].expires_in < Date.now()
        ) {
          res.status(400);
          res.json({
            error: "invalid_grant",
            error_description:
              "The provided authorization grant (e.g., authorization code, resource owner credentials) or refresh token is invalid, expired, revoked, does not match the redirection URI used in the authorization request, or was issued to another client.",
            hint: "Incorrect sign in",
            message:
              "The provided authorization grant (e.g., authorization code, resource owner credentials) or refresh token is invalid, expired, revoked, does not match the redirection URI used in the authorization request, or was issued to another client.",
          });
          conn.end();
          return;
        } else {
          conn
            .query(`SELECT * FROM users WHERE user_id = ?`, [dbRes[0].user_id])
            .then(async (dbRes1) => {
              const groups = [];
              const promises = [];
              let groupLength;
              let i = 0;

              if (dbRes1[0].groups !== null) {
                groupLength = dbRes1[0].groups.split(",").length;

                await dbRes1[0].groups.split(",").forEach(async (group) => {
                  promises.push(
                    new Promise(async (resolve, reject) => {
                      await conn
                        .query(`SELECT * FROM groups WHERE identifier = ?`, [
                          group,
                        ])
                        .then((dbResGroups) => {
                          resolve(
                            groups.push({
                              id: Number(dbResGroups[0].group_id),
                              identifier: String(dbResGroups[0].identifier),
                              name: String(dbResGroups[0].name),
                              short_name: String(dbResGroups[0].short_name),
                              playmodes: dbResGroups[0].playmodes,
                              has_playmodes: Boolean(
                                dbResGroups[0].has_playmodes
                              ),
                              has_listing: Boolean(dbResGroups[0].has_listing),
                              is_probationary: Boolean(
                                dbResGroups[0].is_probationary
                              ),
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
                        avatar_url: String(dbRes1[0].avatar_url),
                        country_code: String(dbRes1[0].country_code),
                        default_group: "default",
                        id: Number(dbRes1[0].user_id),
                        is_active: Boolean(dbRes1[0].is_active),
                        is_bot: Boolean(dbRes1[0].is_bot),
                        is_deleted: Boolean(dbRes1[0].is_deleted),
                        is_online: Boolean(dbRes1[0].is_online),
                        is_supporter: Boolean(dbRes1[0].is_supporter),
                        last_visit: String(
                          new Date(dbRes1[0].last_visit).toISOString()
                        ),
                        pm_friends_only: false,
                        profile_colour: null,
                        username: String(dbRes1[0].username),
                        cover_url: "https://a.hikaru.pw/1/default_cv.jpg",
                        discord: null,
                        has_supported: Boolean(dbRes1[0].has_supported),
                        interests: null,
                        join_date: String(
                          new Date(dbRes1[0].join_date).toISOString()
                        ),
                        kudosu: {
                          total: 0,
                          available: 0,
                        },
                        location: null,
                        max_blocks: 50,
                        max_friends: 250,
                        occupation: null,
                        playmode: "osu",
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
                          code: String(dbRes1[0].country_code),
                          name: String(dbRes1[0].country_name),
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
                          global_rank: Number(dbRes1[0].global_rank),
                          pp: Number(dbRes1[0].pp),
                          ranked_score: 0,
                          hit_accuracy: 0,
                          play_count: Number(dbRes1[0].playcount),
                          play_time: Number(dbRes1[0].play_time),
                          total_score: Number(dbRes1[0].total_score),
                          total_hits: Number(dbRes1[0].total_hits),
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
            })
            .catch((err) => {
              console.log(err);
              res.status(500);
              res.send();
              conn.end();
              return;
            });
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(500);
        res.send();
        conn.end();
        return;
      });
  }
};
