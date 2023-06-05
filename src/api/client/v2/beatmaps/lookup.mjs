// Licensed under GPL v3 - Check Repository Root for full License notice.
// osu!Hikaru, a fully independent osu!Lazer Private Server backend.
// Copyright (C) 2023 Hikaru Team <copyright@hikaru.pw>

const lazer = global.lazer;

export const GET = async (req, res) => {
  try {
    const beatmapData = await lazer.getBeatmap(req.query.id, req.query.checksum);

    res.status(200);
    res.send(beatmapData.data);
  } catch (e) {
    console.log(e);
  } finally {
  }
};
