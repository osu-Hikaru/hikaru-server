// Licensed under GPL v3 - Check Repository Root for full License notice.
// osu!Hikaru, a fully independent osu!Lazer Private Server backend.
// Copyright (C) 2021 Hikaru Team <copyright@hikaru.pw>

import * as modules from "../index.mjs";

export default async (pool, req, res) => {
  const conn = await pool.getConnection();
  const url = req.originalUrl.split("/");
  const args = {};

  url[4]
    .split("?")[1]
    .split("&")
    .forEach((arg) => {
      let objBuild = arg.split("=");

      args[objBuild[0]] = objBuild[1];
    });

  try {
    let i = 0;
    let response = {
      scores: [],
    };

    if (args.mode === undefined) {
      args.mode = "osu";
    }

    switch (args.mode.toLowerCase()) {
      case "osu":
      default:
        args.mode_int = 0;
        break;
    }

    let scores = await conn.query(
      `SELECT * FROM scores_? WHERE (score_id, user_id, beatmap_id) IN (SELECT min(score_id), user_id, beatmap_id FROM scores_? WHERE (user_id, beatmap_id, total_score) IN (select user_id, beatmap_id, max(total_score) AS total_score FROM scores_? WHERE beatmap_id = ? AND passed = 1  GROUP BY user_id, beatmap_id) GROUP BY user_id, beatmap_id) ORDER BY total_score DESC, created_at ASC LIMIT 50`,
      [args.mode_int, args.mode_int, args.mode_int, url[3]] // TODO: Yes I am lazy
    );

    scores.forEach(async (score) => {
      let user = await conn.query(
        `SELECT * FROM users WHERE user_id = ? LIMIT 1`,
        [Number(score.user_id)]
      );

      let mods = [];
      JSON.parse(score.mods).forEach((mod) => {
        mods.push(mod.acronym);
      });

      response.scores.push({
        accuracy: Number(score.accuracy),
        beatmap_id: Number(score.beatmap_id),
        build_id: Number(1),
        created_at: await modules.sqlToOsuDate(score.created_at),
        id: Number(score.score_id),
        max_combo: Number(score.max_combo),
        mods: mods,
        passed: Boolean(score.passed),
        rank: String(score.rank),
        ruleset_id: Number(args.mode_int),
        statistics: {
          great: Number(score.count_great),
          meh: Number(score.count_meh),
          miss: Number(score.count_miss),
          ok: Number(score.count_ok),
          large_tick_hit: Number(score.count_LTH),
          large_tick_miss: Number(score.count_LTM),
          small_tick_hit: Number(score.count_STH),
          small_tick_miss: Number(score.count_STM),
          small_bonus: Number(score.count_SB),
          large_bonus: Number(score.count_LB),
          ignore_miss: Number(score.count_IM),
          ignore_hit: Number(score.count_IH),
          Perfect: Number(score.perfect),
        },
        user: {
          avatar_url: String(user[0].avatar_url),
          country_code: String(user[0].country_code),
          default_group: "default",
          id: Number(user[0].user_id),
          is_active: Boolean(user[0].is_active),
          is_bot: Boolean(user[0].is_bot),
          is_deleted: Boolean(user[0].is_deleted),
          is_online: Boolean(user[0].is_online),
          is_supporter: Boolean(user[0].is_supporter),
          last_visit: await modules.sqlToOsuDate(user[0].last_visit),
          pm_friends_only: Boolean(user[0].is_supporter),
          profile_colour: null,
          username: String(user[0].username),
          country: {
            code: String(user[0].country_code),
            name: String(user[0].country_name),
          },
          cover: {
            custom_url: null,
            url: "https://a.hikaru.pw/1/default_cv.jpg",
            id: null,
          },
        },
        score: Number(score.total_score),
        user_id: Number(score.user_id),
      });

      i++;
    });

    function sendResult() {
      if (i === scores.length) {
        res.status(200);
        res.json(response);
        console.log(response);
        conn.end();
      } else {
        setTimeout(sendResult, 200);
      }
    }

    sendResult();
  } catch (err) {
    conn.end();
    console.log(err);
    res.status(500);
    res.send();
    conn.end();
    return;
  }
};
