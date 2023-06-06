// Licensed under GPL v3 - Check Repository Root for full License notice.
// osu!Hikaru, a fully independent osu!Lazer Private Server backend.
// Copyright (C) 2023 Hikaru Team <copyright@hikaru.pw>

const lazer = global.lazer;
const logger = global.logger;

export const GET = async (req, res) => {
  try {
    const reqURL = req.url.split("/");

    const beatmapsetData = await lazer.getBeatmapset(reqURL[3]);

    res.status(200);
    res.send(beatmapsetData.data);
  } catch (err) {
    res.status(500);
    res.send();

    logger.error("express", err);

    return;
  } finally {
  }
};
