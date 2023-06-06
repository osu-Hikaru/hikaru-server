// Licensed under GPL v3 - Check Repository Root for full License notice.
// osu!Hikaru, a fully independent osu!Lazer Private Server backend.
// Copyright (C) 2023 Hikaru Team <copyright@hikaru.pw>

const database = global.database;
const lazer = global.lazer;
const logger = global.logger;

export const GET = async (req, res) => {
  try {
    const beatmapData = await lazer.getBeatmap(
      req.query.id,
      req.query.filename,
      req.query.checksum
    );

    if (beatmapData.type === "api") {
      let insertObj = beatmapData.data;

      delete insertObj.failtimes;
      delete insertObj.beatmapset;

      let queryToRun = database.generateSQLInsertQuery(
        "beatmaps",
        beatmapData.data
      );

      await database.runQuery(queryToRun.query, queryToRun.values);
    }

    res.status(200);
    res.send(beatmapData.data);
  } catch (err) {
    res.status(500);
    res.send();

    logger.error("express", err);

    return;
  } finally {
  }
};
