// Licensed under GPL v3 - Check Repository Root for full License notice.
// osu!Hikaru, a fully independent osu!Lazer Private Server backend.
// Copyright (C) 2023 Hikaru Team <copyright@hikaru.pw>

// TODO: Experimental endpoint

const lazer = global.lazer;
const logger = global.logger;

export const GET = async (req, res) => {
  try {
    let reqURL = req.url.split("/");

    const beatmapListing = await lazer.getBeatmapsetDownload(reqURL[3]);

    res.set({ ...beatmapListing.headers });
    res.send(beatmapListing.data);
  } catch (err) {
    res.status(500);
    res.send();

    logger.error("express", err);

    return;
  } finally {
  }
};
