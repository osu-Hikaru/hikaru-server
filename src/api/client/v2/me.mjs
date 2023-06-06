// Licensed under GPL v3 - Check Repository Root for full License notice.
// osu!Hikaru, a fully independent osu!Lazer Private Server backend.
// Copyright (C) 2023 Hikaru Team <copyright@hikaru.pw>

// TODO: Experimental endpoint

const database = global.database;
const logger = global.logger;

export const GET = async (req, res) => {
  try {
    const groups = [];
    const promises = [];
    const userObj = await database.runQuery(
      `SELECT * FROM users WHERE user_id = ?`,
      [Number(res.JWT.client_id)]
    );

    if (userObj[0].groups !== null) {
      await userObj[0].groups.split(",").forEach(async (group) => {
        promises.push(
          new Promise(async (resolve, reject) => {
            let groupInfo = await database.runQuery(
              `SELECT * FROM groups WHERE identifier = ?`,
              [group]
            );
            resolve(
              groups.push({
                id: Number(groupInfo[0].group_id),
                identifier: String(groupInfo[0].identifier),
                name: String(groupInfo[0].name),
                short_name: String(groupInfo[0].short_name),
                playmodes: groupInfo[0].playmodes,
                has_playmodes: Boolean(groupInfo[0].has_playmodes),
                has_listing: Boolean(groupInfo[0].has_listing),
                is_probationary: Boolean(groupInfo[0].is_probationary),
                colour: String("#" + groupInfo[0].colour),
              })
            );
          })
        );
      });
    }

    await Promise.all(promises).then(() => {
      res.status(200);
      res.json({
        account_history: [], // TODO: Implement
        active_tournament_banner: null, // TODO: Implement
        avatar_url: String(userObj[0].avatar_url),
        badges: [], // TODO: Implement
        beatmap_playcounts_count: 0, // TODO: Implement
        comments_count: 0, // TODO: implement
        country: {
          code: String(userObj[0].country_code),
          name: String(userObj[0].country_name),
        },
        country_code: String(userObj[0].country_code),
        cover: {
          custom_url: null,
          id: null,
          url: "https://a.hikaru.pw/1/default_cv.jpg",
        }, // TODO: Implement
        cover_url: String(userObj[0].cover_url), // TODO: Implement
        default_group: "default",
        discord: null, // TODO: Implement
        favourite_beatmapset_count: 0, // TODO: Implement
        follower_count: 0, // TODO: Implement
        graveyard_beatmapset_count: 0, // TODO: Implement
        groups: groups, // TODO: Implement
        guest_beatmapset_count: 0, // TODO: Implement
        has_supported: Boolean(userObj[0].has_supported),
        id: Number(userObj[0].user_id),
        interests: null, // TODO: Implement
        is_active: Boolean(userObj[0].is_active),
        is_bot: Boolean(userObj[0].is_bot),
        is_deleted: Boolean(userObj[0].is_deleted),
        is_online: Boolean(userObj[0].is_online),
        is_restricted: Boolean(false), // TODO: Implement
        is_supporter: Boolean(userObj[0].is_supporter),
        join_date: String(new Date(userObj[0].join_date).toISOString()),
        kudosu: {
          available: 0,
          total: 0,
        }, // TODO: Implement
        last_visit: String(new Date(userObj[0].last_visit).toISOString()),
        location: null, //TODO: Implement
        loved_beatmapset_count: 0, // TODO: Implement
        mapping_follower_count: 0, // TODO: Implement
        max_blocks: 250,
        max_friends: 250,
        monthly_playcounts: [], // TODO: Impement
        occupation: null, // TODO: Implement
        page: {
          html: "",
          raw: "",
        }, // TODO: Implement
        pending_beatmapset_count: 0, // TODO: Implement
        playmode: "osu", // TODO: Implement
        playstyle: [], // TODO: Implement
        pm_friends_only: Boolean(userObj[0].pm_friends_only),
        post_count: 0, // TODO: Implement
        previous_usernames: [], // TODO: Implement
        profile_colour: null, // TODO: Implement
        profile_order: [
          "me",
          "recent_activity",
          "top_ranks",
          "medals",
          "historical",
          "beatmaps",
          "kudosu",
        ], // TODO: Implement
        rankHistory: null, // TODO: Implement
        ranked_and_approved_beatmapset_count: 0, // TODO: Implement
        ranked_beatmapset_count: 0, // TODO: Implement
        replays_watched_counts: [], // TODO: Implement
        scores_best_count: 0, // TODO: Implement
        scores_first_count: 0, // TODO: Implement
        scores_pinned_count: 0, // TODO: Implement
        scores_recent_count: 0, // TODO: Implement
        statistics: {
          country_rank: 0,
          global_rank: 0,
          grade_counts: {
            a: 0,
            s: 0,
            sh: 0,
            ss: 0,
            ssh: 0,
          },
          hit_accuracy: 0, // TODO: Implement
          is_ranked: true, // TODO: Implement
          level: {
            current: 0,
            progress: 0,
          }, // TODO: Implement
          maximum_combo: 0, // TODO: Implement
          play_count: 0, // TODO: Implement
          play_time: 0, // TODO: Implement
          pp: 0, // TODO: Implement
          rank: {
            country: 0,
          }, // TODO: Implement
          ranked_score: 0, // TODO: Implement
          replays_watched_by_others: 0, // TODO: Implement
          total_hits: 0, // TODO: Implement
          total_score: 0, // TODO: Implement
        },

        statistics_rulesets: {
          fruits: {
            global_rank: null,
            grade_counts: {
              a: 0,
              s: 0,
              sh: 0,
              ss: 0,
              ssh: 0,
            },
            hit_accuracy: 0,
            is_ranked: false,
            level: {
              current: 0,
              progress: 0,
            },
            maximum_combo: 0,
            play_count: 0,
            play_time: 0,
            pp: 0,
            ranked_score: 0,
            replays_watched_by_others: 0,
            total_hits: 0,
            total_score: 0,
          },
          mania: {
            global_rank: null,
            grade_counts: {
              a: 0,
              s: 0,
              sh: 0,
              ss: 0,
              ssh: 0,
            },
            hit_accuracy: 0,
            is_ranked: false,
            level: {
              current: 0,
              progress: 0,
            },
            maximum_combo: 0,
            play_count: 0,
            play_time: 0,
            pp: 0,
            ranked_score: 0,
            replays_watched_by_others: 0,
            total_hits: 0,
            total_score: 0,
          },
          osu: {
            global_rank: 0, // TODO: Implement
            grade_counts: {
              a: 0,
              s: 0,
              sh: 0,
              ss: 0,
              ssh: 0,
            },
            hit_accuracy: 0,
            is_ranked: true,
            level: {
              current: 0,
              progress: 0,
            },
            maximum_combo: 0,
            play_count: 0, // TODO: Implement
            play_time: 0, // TODO: Implement

            pp: 0,
            ranked_score: 0,
            replays_watched_by_others: 0,
            total_hits: 0, // TODO: Implement
            total_score: 0, // TODO: Implement
          },
          taiko: {
            global_rank: null,
            grade_counts: {
              a: 0,
              s: 0,
              sh: 0,
              ss: 0,
              ssh: 0,
            },
            hit_accuracy: 0,
            is_ranked: false,
            level: {
              current: 0,
              progress: 0,
            },
            maximum_combo: 0,
            play_count: 0,
            play_time: 0,
            pp: 0,
            ranked_score: 0,
            replays_watched_by_others: 0,
            total_hits: 0,
            total_score: 0,
          },
        }, // TODO: CRITICAL: Implement
        support_level: 0, // TODO: Implement
        title: null, // TODO: Implement
        title_url: null, // TODO: Implement
        twitter: null, // TODO: Implement
        unranked_beatmapset_count: 0, // TODO: Implement
        user_achievements: [], // TODO: Implement
        username: String(userObj[0].username),
        website: null, // TODO: Implement
      });
    });
  } catch (err) {
    res.status(500);
    res.send();

    logger.error("express", err);

    return;
  } finally {
  }
};
