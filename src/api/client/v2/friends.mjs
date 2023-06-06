// Licensed under GPL v3 - Check Repository Root for full License notice.
// osu!Hikaru, a fully independent osu!Lazer Private Server backend.
// Copyright (C) 2023 Hikaru Team <copyright@hikaru.pw>

// TODO: Experimental endpoint

const logger = global.logger;

export const GET = async (req, res) => {
  try {
    res.status(200);
    res.send([]);
  } catch (err) {
    logger.error("express", err);
  } finally {
  }
};
