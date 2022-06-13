// Licensed under GPL v3 - Check Repository Root for full License notice.
// osu!Hikaru, a fully independent osu!Lazer Private Server backend.
// Copyright (C) 2021 Hikaru Team <copyright@hikaru.pw>

import * as modules from "../index.mjs";

export default async (pool, req, res) => {
  const conn = await pool.getConnection();

  let map = await conn
    .query(
      `SELECT * FROM beatmaps WHERE beatmap_id = ? AND checksum = ? LIMIT 1`,
      [req.query.id, req.query.checksum]
    )
    .catch((err) => {
      console.log(err);
      res.status(500);
      res.send();
      conn.end();
      return;
    });

  if (map[0] === undefined) {
    map[0] = {};
    map[0].status = 0;
    map[0].beatmapset_id = 0;
  }

  let set = await conn
    .query(`SELECT * FROM beatmapsets WHERE beatmapset_id = ? LIMIT 1`, [
      map[0].beatmapset_id,
    ])
    .catch((err) => {
      console.log(err);
      res.status(500);
      res.send();
      conn.end();
      return;
    });

  if (map[0].id !== undefined) {
    res.status(200);
    res.json({
      accuracy: Number(map[0].accuracy),
      ar: Number(map[0].ar),
      beatmapset: {
        artist: String(set[0].artist),
        artist_unicode: String(set[0].artist_unicode),
        availability: {
          download_disabled: Boolean(set[0].download_disabled),
          more_information: String(set[0].more_information),
        },
        bpm: Number(set[0].bpm),
        can_be_hyped: Boolean(false),
        covers: {
          cover: String(
            `https://assets.ppy.sh/beatmaps/${set[0].beatmapset_id}/covers/cover.jpg?${set[0].cover_id}`
          ),
          "cover@2x": String(
            `https://assets.ppy.sh/beatmaps/${set[0].beatmapset_id}/covers/cover@2x.jpg?${set[0].cover_id}`
          ),
          card: String(
            `https://assets.ppy.sh/beatmaps/${set[0].beatmapset_id}/covers/card.jpg?${set[0].cover_id}`
          ),
          "card@2x": String(
            `https://assets.ppy.sh/beatmaps/${set[0].beatmapset_id}/covers/card@2x.jpg?${set[0].cover_id}`
          ),
          list: String(
            `https://assets.ppy.sh/beatmaps/${set[0].beatmapset_id}/covers/list.jpg?${set[0].cover_id}`
          ),
          "list@2x": String(
            `https://assets.ppy.sh/beatmaps/${set[0].beatmapset_id}/covers/list@2x.jpg?${set[0].cover_id}`
          ),
          slimcover: String(
            `https://assets.ppy.sh/beatmaps/${set[0].beatmapset_id}/covers/slimcover.jpg?${set[0].cover_id}`
          ),
          "slimcover@2x": String(
            `https://assets.ppy.sh/beatmaps/${set[0].beatmapset_id}/covers/slimcover@2x.jpg?${set[0].cover_id}`
          ),
        },
        creator: String(set[0].creator),
        discussion_enabled: Boolean(true),
        discussion_locked: Boolean(false),
        favourite_count: Number(0),
        has_favourited: Boolean(false),
        hype: set[0].hype,
        id: Number(set[0].beatmapset_id),
        is_scoreable: Boolean(true),
        last_updated: String(new Date(set[0].last_updated).toISOString()),
        legacy_thread_url: String(null),
        nominations_summary: {
          current: set[0].nominations_current,
          required: set[0].nominations_required,
        },
        nsfw: Boolean(set[0].nsfw),
        play_count: Number(0),
        preview_url: String(
          `https://b.ppy.sh/preview/${set[0].beatmapset_id}.mp3`
        ),
        ranked: Number(set[0].ranked),
        ranked_date: await modules.sqlToOsuDate(set[0].ranked_date),
        ratings: [],
        source: String(set[0].source),
        status: String(set[0].status),
        storyboard: Boolean(set[0].storyboard),
        submitted_date: await modules.sqlToOsuDate(set[0].submitted_date),
        tags: String(set[0].tags),
        title: String(set[0].title),
        title_unicode: String(set[0].title_unicode),
        track_id: Number(set[0].track_id),
        user_id: Number(3),
        video: Boolean(set[0].video),
      },
      beatmapset_id: Number(map[0].beatmapset_id),
      bpm: Number(map[0].bpm),
      checksum: String(map[0].checksum),
      convert: Boolean(map[0].is_convert),
      count_circles: Number(map[0].count_circles),
      count_sliders: Number(map[0].count_sliders),
      count_spinners: Number(map[0].count_spinners),
      cs: Number(map[0].cs),
      deleted_at: String(map[0].deleted_at),
      difficulty_rating: Number(map[0].difficulty_rating),
      drain: Number(map[0].drain),
      failtimes: {
        exit: [],
        fail: [],
      },
      hit_length: Number(map[0].hit_length),
      id: Number(map[0].beatmap_id),
      is_scoreable: Boolean(map[0].convert),
      last_updated: await modules.sqlToOsuDate(set[0].last_updated),
      max_combo: Number(map[0].new_max_combo),
      mode: String(map[0].mode),
      mode_int: Number(map[0].mode_int),
      passcount: Number(map[0].passcount),
      playcount: Number(map[0].playcount),
      ranked: Number(map[0].ranked),
      status: String(map[0].status),
      total_length: Number(map[0].total_length),
      url: String(map[0].url),
      user_id: Number(map[0].user_id),
      version: String(map[0].version),
    });
    conn.end();
  } else {
    const beatmap = await modules
      .oapiGetBeatmap(req.query.id, req.query.checksum)
      .catch((err) => {
        console.log(err);
        res.status(500);
        res.json("Internal Server Error.");
        conn.end();
        return;
      });

    if (set[0] === undefined) {
      await conn
        .query(
          `REPLACE INTO beatmapsets (nomination_current, nomination_required, artist, artist_unicode, cover_id, creator, beatmapset_id, nsfw, source, status, title, title_unicode, track_id, user_id, video, download_disabled, more_information, bpm, last_updated, ranked, ranked_date, storyboard, submitted_date, tags) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
          [
            Number(beatmap.data.beatmapset.nominations_summary.current),
            Number(beatmap.data.beatmapset.nominations_summary.required),
            String(beatmap.data.beatmapset.artist),
            String(beatmap.data.beatmapset.artist_unicode),
            Number(beatmap.data.beatmapset.covers.cover.split("?")[1]),
            String(beatmap.data.beatmapset.creator),
            Number(beatmap.data.beatmapset.id),
            Number(beatmap.data.beatmapset.nsfw),
            String(beatmap.data.beatmapset.source),
            String(beatmap.data.beatmapset.status),
            String(beatmap.data.beatmapset.title),
            String(beatmap.data.beatmapset.title_unicode),
            Number(beatmap.data.beatmapset.track_id),
            Number(3),
            Number(beatmap.data.beatmapset.video),
            Number(beatmap.data.beatmapset.availability.download_disabled),
            String(beatmap.data.beatmapset.availability.more_information),
            Number(beatmap.data.beatmapset.bpm),
            new Date(beatmap.data.beatmapset.last_updated),
            Number(beatmap.data.beatmapset.ranked),
            new Date(beatmap.data.beatmapset.ranked_date),
            Number(beatmap.data.beatmapset.storyboard),
            new Date(beatmap.data.beatmapset.submitted_date),
            String(beatmap.data.beatmapset.tags),
          ]
        )
        .catch((err) => {
          console.log(err);
          res.status(500);
          res.send();
          conn.end();
          return;
        });
    }

    await conn
      .query(
        `REPLACE INTO beatmaps (accuracy, ar, beatmapset_id, bpm, checksum, is_convert, count_circles, count_sliders, count_spinners, cs, deleted_at, difficulty_rating, drain, hit_length, beatmap_id, is_scoreable, last_updated, max_combo, new_max_combo, mode, mode_int, passcount, playcount, ranked, status, total_length, url, user_id, version) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
        [
          Number(beatmap.data.accuracy),
          Number(beatmap.data.ar),
          Number(beatmap.data.beatmapset_id),
          Number(beatmap.data.bpm),
          String(beatmap.data.checksum),
          Boolean(beatmap.data.convert),
          Number(beatmap.data.count_circles),
          Number(beatmap.data.count_sliders),
          Number(beatmap.data.count_spinners),
          Number(beatmap.data.cs),
          beatmap.data.deleted_at,
          Number(beatmap.data.difficulty_rating),
          Number(beatmap.data.drain),
          Number(beatmap.data.hit_length),
          Number(beatmap.data.id),
          Boolean(beatmap.data.is_scoreable),
          new Date(beatmap.data.last_updated),
          Number(beatmap.data.max_combo),
          Number(beatmap.data.max_combo - beatmap.data.count_sliders),
          String(beatmap.data.mode),
          Number(beatmap.data.mode_int),
          Number(0),
          Number(0),
          Number(beatmap.data.ranked),
          String(beatmap.data.status),
          Number(beatmap.data.total_length),
          String(beatmap.data.url),
          Number(beatmap.data.user_id),
          String(beatmap.data.version),
        ]
      )
      .catch((err) => {
        console.log(err);
        res.status(500);
        res.send();
        conn.end();
        return;
      });

    conn.end();
    res.status(200);
    res.json({
      accuracy: Number(beatmap.data.accuracy),
      ar: Number(beatmap.data.ar),
      beatmapset: {
        artist: String(beatmap.data.beatmapset.artist),
        artist_unicode: String(beatmap.data.beatmapset.artist_unicode),
        availability: {
          download_disabled: Boolean(
            beatmap.data.beatmapset.availability.download_disabled
          ),
          more_information: String(
            beatmap.data.beatmapset.availability.more_information
          ),
        },
        bpm: Number(beatmap.data.beatmapset.bpm),
        can_be_hyped: Boolean(false),
        covers: {
          card: String(beatmap.data.beatmapset.covers.card),
          "card@2x": String(beatmap.data.beatmapset.covers["card@2x"]),
          cover: String(beatmap.data.beatmapset.covers.cover),
          "cover@2x": String(beatmap.data.beatmapset.covers["cover@2x"]),
          list: String(beatmap.data.beatmapset.covers.list),
          "list@2x": String(beatmap.data.beatmapset.covers["list@2x"]),
          slimcover: String(beatmap.data.beatmapset.covers.slimcover),
          "slimcover@2x": String(
            beatmap.data.beatmapset.covers["slimcover@2x"]
          ),
        },
        creator: String(beatmap.data.beatmapset.creator),
        discussion_enabled: Boolean(true),
        discussion_locked: Boolean(false),
        favourite_count: Number(0),
        has_favourited: Boolean(false),
        hype: beatmap.data.beatmapset.hype,
        id: Number(beatmap.data.beatmapset.id),
        is_scoreable: Boolean(true),
        last_updated: String(
          new Date(beatmap.data.beatmapset.last_updated).toISOString()
        ),
        legacy_thread_url: String(null),
        nominations_summary: {
          current: beatmap.data.beatmapset.nominations_summary.current,
          required: beatmap.data.beatmapset.nominations_summary.required,
        },
        nsfw: Boolean(beatmap.data.beatmapset.nsfw),
        play_count: Number(0),
        preview_url: String(
          `https://b.ppy.sh/preview/${beatmap.data.beatmapset.id}.mp3`
        ),
        ranked: Number(beatmap.data.beatmapset.ranked),
        ranked_date: String(beatmap.data.beatmapset.ranked_date),
        ratings: [],
        source: String(beatmap.data.beatmapset.source),
        status: String(beatmap.data.beatmapset.status),
        storyboard: Boolean(beatmap.data.beatmapset.storyboard),
        submitted_date: String(beatmap.data.beatmapset.submitted_date),
        tags: String(beatmap.data.beatmapset.tags),
        title: String(beatmap.data.beatmapset.title),
        title_unicode: String(beatmap.data.beatmapset.title_unicode),
        track_id: Number(beatmap.data.beatmapset.track_id),
        user_id: Number(3),
        video: Boolean(beatmap.data.beatmapset.video),
      },
      beatmapset_id: Number(beatmap.data.beatmapset_id),
      bpm: Number(beatmap.data.bpm),
      checksum: String(beatmap.data.checksum),
      convert: Boolean(beatmap.data.convert),
      count_circles: Number(beatmap.data.count_circles),
      count_sliders: Number(beatmap.data.count_sliders),
      count_spinners: Number(beatmap.data.count_spinners),
      cs: Number(beatmap.data.cs),
      deleted_at: String(beatmap.data.deleted_at),
      difficulty_rating: Number(beatmap.data.difficulty_rating),
      drain: Number(beatmap.data.drain),
      failtimes: {
        exit: [],
        fail: [],
      },
      hit_length: Number(beatmap.data.hit_length),
      id: Number(beatmap.data.id),
      is_scoreable: Boolean(beatmap.data.convert),
      last_updated: String(beatmap.data.last_updated),
      max_combo: Number(beatmap.data.new_max_combo),
      mode: String(beatmap.data.mode),
      mode_int: Number(beatmap.data.mode_int),
      passcount: Number(0),
      playcount: Number(0),
      ranked: Number(beatmap.data.ranked),
      status: String(beatmap.data.status),
      total_length: Number(beatmap.data.total_length),
      url: String(beatmap.data.url),
      user_id: Number(beatmap.data.user_id),
      version: String(beatmap.data.version),
    });
  }
};
