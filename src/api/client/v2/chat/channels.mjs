// Licensed under GPL v3 - Check Repository Root for full License notice.
// osu!Hikaru, a fully independent osu!Lazer Private Server backend.
// Copyright (C) 2023 Hikaru Team <copyright@hikaru.pw>

// TODO: Experimental endpoint

const database = global.database;
const logger = global.logger;

export const GET = async (req, res) => {
  try {
    let responseMessage = [];

    const databaseResponse = database.runQuery("SELECT * FRO CHANNELS");

    databaseResponse.forEach((result) => {
      responseMessage.push(result);
    });

    res.status(200);
    res.json(responseMessage);
  } catch (err) {
    logger.error("express", err);
  } finally {
  }
};
