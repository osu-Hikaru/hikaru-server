// Licensed under GPL v3 - Check Repository Root for full License notice.
// osu!Hikaru, a fully independent osu!Lazer Private Server backend.
// Copyright (C) 2023 Hikaru Team <copyright@hikaru.pw>

// TODO: Experimental endpoint

const lazer = global.lazer;
const logger = global.logger;

export const GET = async (req, res) => {
  let reqString = "";

  Object.keys(req.query).forEach((key) => {
    reqString += key + "=" + req.query[key] + "&";
  });

  const beatmapListing = await lazer.getBeatmapListing(reqString.slice(0, -1));

  try {
    res.status(200);
    res.json(beatmapListing.data);
  } catch (err) {
    res.status(500);
    res.send();

    logger.error("express", err);

    return;
  } finally {
  }
};
