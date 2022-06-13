// Licensed under GPL v3 - Check Repository Root for full License notice.
// osu!Hikaru, a fully independent osu!Lazer Private Server backend.
// Copyright (C) 2021 Hikaru Team <copyright@hikaru.pw>

export default async (pool, req, res) => {
  const conn = await pool.getConnection();
  const url = req.originalUrl.split("/");

  try {
    if (req.headers.authorization === undefined) {
      res.status(401);
      res.send();
      conn.end();
      return;
    } else {
      let mode = "osu";
      let mode_int = 0;

      switch (url[3]) {
        case "osu":
        default:
          mode = "osu";
          mode_int = 0;
          break;
      }

      await conn
        .query(`SELECT * FROM active_tokens WHERE access_token = ? LIMIT 1`, [
          req.headers.authorization.split(" ")[1],
        ])
        .then(async (authentication_check) => {
          if (
            authentication_check[0] === undefined ||
            authentication_check[0].created_at +
              authentication_check[0].expires_in <
              Date.now()
          ) {
            res.status(400);
            res.json({
              error: "invalid_grant",
              error_description:
                "The provided authorization grant (e.g., authorization code, resource owner credentials) or refresh token is invalid, expired, revoked, does not match the redirection URI used in the authorization request, or was issued to another client.",
              hint: "Incorrect sign in",
              message:
                "The provided authorization grant (e.g., authorization code, resource owner credentials) or refresh token is invalid, expired, revoked, does not match the redirection URI used in the authorization request, or was issued to another client.",
            }); // TODO: This
            conn.end();
            return;
          } else {
            let user = await conn.query(
              `SELECT * FROM users WHERE user_id = ?`,
              [authentication_check[0].user_id]
            );

            let user_mode = await conn.query(
              `SELECT * FROM users_? WHERE user_id = ?`,
              [Number(mode_int), authentication_check[0].user_id]
            );

            const groups = [];
            const promises = [];
            let max_blocks_multi = 0;
            let max_friends_multi;
            let groupLength;
            let i = 0;

            if (user[0].groups !== null) {
              groupLength = user[0].groups.split(",").length;

              await user[0].groups.split(",").forEach(async (group) => {
                if (group.max_blocks_multi > max_blocks_multi)
                  max_blocks_multi = groups.max_blocks_multi;
                if (group.max_friends_multi > max_friends_multi)
                  max_friends_multi = groups.max_friends_multi;

                promises.push(
                  new Promise(async (resolve, reject) => {
                    await conn
                      .query(`SELECT * FROM groups WHERE identifier = ?`, [
                        group,
                      ])
                      .then((groupData) => {
                        resolve(
                          groups.push({
                            id: Number(groupData[0].group_id),
                            identifier: String(groupData[0].identifier),
                            name: String(groupData[0].name),
                            short_name: String(groupData[0].short_name),
                            playmodes: groupData[0].playmodes,
                            has_playmodes: Boolean(groupData[0].has_playmodes),
                            has_listing: Boolean(groupData[0].has_listing),
                            is_probationary: Boolean(
                              groupData[0].is_probationary
                            ),
                            colour: String("#" + groupData[0].colour),
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
                await Promise.all(promises).then(async (resolved) => {
                  let response = {
                    // TODO: Rewrite crappy implicit sql code
                    avatar_url: String(user[0].avatar_url),
                    country_code: String(user[0].country_code),
                    default_group: "default",
                    id: Number(user[0].user_id),
                    is_active: Boolean(user[0].is_active),
                    is_bot: Boolean(user[0].is_bot),
                    is_deleted: Boolean(user[0].is_deleted),
                    is_online: Boolean(user[0].is_online),
                    is_supporter: Boolean(user[0].is_supporter),
                    last_visit: String(
                      new Date(user[0].last_visit).toISOString()
                    ),
                    pm_friends_only: Boolean(user[0].pm_friends_only),
                    profile_colour: null, // TODO: Implement, figure out wtf
                    username: String(user[0].username),
                    cover_url: String(user[0].cover_url), // TODO: Implement frontend change
                    discord: null, // TODO: Implement
                    has_supported: Boolean(user[0].has_supported),
                    interests: null, // TODO: Implement
                    join_date: String(
                      new Date(user[0].join_date).toISOString()
                    ),
                    kudosu: {
                      total: 0,
                      available: 0,
                    }, // TODO: Implement
                    location: null, // TODO: Implement
                    max_blocks: 50 * max_blocks_multi,
                    max_friends: 250 * max_friends_multi,
                    occupation: null, // TODO: Implement
                    playmode: String(mode),
                    playstyle: null, // TODO: Implement
                    post_count: 0, // TODO: Implement
                    profile_order: [
                      "me",
                      "recent_activity",
                      "top_ranks",
                      "medals",
                      "historical",
                      "beatmaps",
                      "kudosu",
                    ], // TODO: Implement
                    title: null, // TODO: Implement
                    title_url: null, // TODO: Implement
                    twitter: null, // TODO: Implement
                    website: null, // TODO: Implement
                    country: {
                      code: String(user[0].country_code),
                      name: String(user[0].country_name),
                    }, // TODO: Implement
                    cover: {
                      custom_url: null,
                      url: "https://a.hikaru.pw/1/default_cv.jpg",
                      id: "4",
                    }, // TODO: Implement
                    account_history: [], // TODO: Implement & Figure it out
                    active_tournament_banner: null, // TODO: Implement
                    badges: [], // TODO: Implement
                    beatmap_playcounts_count: 0, // TODO: Implement
                    comments_count: 0, // TODO: Implement
                    favourite_beatmapset_count: 0, // TODO: Implement
                    follower_count: 1, // TODO: Implement
                    graveyard_beatmapset_count: 0, // TODO: Implement
                    groups: groups,
                    loved_beatmapset_count: 0, // TODO: Implement
                    mapping_follower_count: 0, // TODO: Implement
                    monthly_playcounts: [], // TODO: Implement
                    page: {
                      html: "",
                      raw: "",
                    }, // TODO: Implement
                    pending_beatmapset_count: 0, // TODO: Implement
                    previous_usernames: [], // TODO: Implement
                    ranked_beatmapset_count: 0, // TODO: Implement
                    replays_watched_counts: [], // TODO: Implement
                    scores_best_count: 0, // TODO: Implement
                    scores_first_count: 0, // TODO: Implement
                    scores_recent_count: 0, // TODO: Implement
                    statistics: {
                      level: {
                        current: 1,
                        progress: 0,
                      }, // TODO: Implement
                      global_rank: Number(user_mode[0].global_rank),
                      pp: Number(user_mode[0].pp),
                      ranked_score: 0, // TODO: Implement
                      hit_accuracy: 0, // TODO: Implement
                      play_count: Number(user_mode[0].playcount),
                      play_time: Number(user_mode[0].play_time),
                      total_score: Number(user_mode[0].total_score),
                      total_hits: Number(user_mode[0].total_hits),
                      maximum_combo: 0, // TODO: Implement
                      replays_watched_by_others: 0, // TODO: Implement
                      is_ranked: false,
                      grade_counts: {
                        ss: 0,
                        ssh: 0,
                        s: 0,
                        sh: 0,
                        a: 0,
                      }, // TODO: Implement
                      rank: {
                        country: null,
                      }, // TODO: Implement
                    },
                    support_level: 0, // TODO: Implement
                    user_achievements: [], // TODO: Implement
                    rankHistory: null, // TODO: Implement
                    rank_history: null, // TODO: Implement
                    ranked_and_approved_beatmapset_count: 0, // TODO: Implement
                    unranked_beatmapset_count: 0, // TODO: Implement
                  };

                  res.status(200);
                  res.json(response);
                  conn.end();
                  return;
                });
              } else {
                setTimeout(processPromises, 250);
              }
            }
            processPromises();
          }
        });
    }
  } catch (err) {
    conn.end();
    console.log(err);
    res.status(500);
    res.send();
    conn.end();
    return;
  }
};
