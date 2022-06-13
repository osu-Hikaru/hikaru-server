// Licensed under GPL v3 - Check Repository Root for full License notice.
// osu!Hikaru, a fully independent osu!Lazer Private Server backend.
// Copyright (C) 2021 Hikaru Team <copyright@hikaru.pw>

import * as modules from "../index.mjs";

export default async (pool, req, res) => {
  const conn = await pool.getConnection();
  const url = req.originalUrl.split("/");
  let response = {
    cursor: {
      page: null,
    },
    ranking: [],
    total: 0,
  };
  let type = "performance";
  let mode = "osu";
  let mode_int = 0;
  let cursor = 0;

  try {
    // Mode

    switch (url[3]) {
      case "osu":
        mode = "osu";
        mode_int = 0;
        break;
      default:
        mode = "";
        mode_int = null;
        break;
    }

    // Type

    switch (url[4].split("?")[0]) {
      case "performance":
        type = "performance";
        break;
      default:
        type = "";
        break;
    }

    async function handler(type, mode) {
      if (type === "performance" && mode === "osu") {
        const rankings = await conn.query(
          `SELECT * FROM users_? ORDER BY pp DESC LIMIT 50 OFFSET 0`,
          [Number(mode_int)]
        );

        const count = await conn.query(`SELECT count(*) FROM users`);

        response.total = Number(count[0]["count(*)"]);

        rankings.forEach(async (ranking) => {
          const user_base = await conn.query(`SELECT * FROM users WHERE user_id = ? LIMIT 1`, [ranking.user_id])

          let i = 0;
          for (i; ranking !== rankings[i]; i++) {}

          await response.ranking.push({
            level: {
              current: 0,
              progress: 0,
            }, // TODO: Implement Level
            global_rank: Number(i + 1),
            pp: Number(ranking.pp),
            ranked_score: 0, // TODO: Ranked Score
            hit_accuracy: 100, // TODO: Hit acc
            play_count: 0, // TODO: Playcount???
            play_time: Number(ranking.play_time),
            total_score: Number(ranking.total_score),
            total_hits: Number(ranking.total_hits),
            maximum_combo: 0, // TODO: Max Combo
            replays_watched_by_others: 0, // TODO: Replays
            is_ranked: true,
            grade_counts: {
              ss: 0, 
              ssh: 0,
              s: 0,
              sh: 0,
              a: 0,
            }, // TODO: Grade Total
            user: {
              avatar_url: String(user_base.avatar_url), // TODO: Custom AV's
              country_code: String(user_base.country_code), // TODO: Countries
              default_group: "default", 
              id: Number(ranking.user_id),
              is_active: Boolean(user_base.is_active),
              is_bot: Boolean(user_base.is_bot),
              is_deleted: Boolean(user_base.is_deleted),
              is_online: Boolean(user_base.is_online),
              is_supporter: Boolean(user_base.is_supporter),
              last_visit: await modules.sqlToOsuDate(user_base.last_visit),
              pm_friends_only: Boolean(false),
              profile_colour: null,
              username: String(user_base.username),
              country: {
                code: String(user_base.country_code),
                name: String(user_base.country_name),
              }, // TODO: Country 2
              cover: {
                custom_url: null,
                url: "https://a.hikaru.pw/1/default_cv.jpg",
                id: "4",
              }, // TODO: Covers
            },
          });

          cursor++;
        });

        async function checkDone() {
          if (cursor === rankings.length) {
            res.status(200);
            res.json(response);
            conn.end();
          } else {
            setTimeout(checkDone, 500);
          }
        }

        checkDone();
      } else {
        res.status(200);
        res.json(response);
        conn.end();
      }
    }

    handler(type, mode);
  } catch (err) {
    res.status(500);
    res.json({});
    conn.end();
    console.log(err);
  }
};
