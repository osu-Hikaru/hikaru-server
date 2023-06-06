// Licensed under GPL v3 - Check Repository Root for full License notice.
// osu!Hikaru, a fully independent osu!Lazer Private Server backend.
// Copyright (C) 2023 Hikaru Team <copyright@hikaru.pw>

const logger = global.logger;
const resolver = global.resolver;

export default (expressInstance) => {
  logger.info("express-routes", "Loading Beatmapset routes...");

  expressInstance.get("/v2/beatmapsets/search", async (req, res, next) => {
    const endpoint = await resolver.resolveDict(
      "api.client.v2.beatmapsets.search"
    );
    endpoint.GET(req, res);
  });

  expressInstance.get("/v2/beatmapsets/*/download", async (req, res, next) => {
    const endpoint = await resolver.resolveDict("api.client.v2.beatmapsets.download");
    endpoint.GET(req, res);
  });

  expressInstance.get("/v2/beatmapsets/*", async (req, res, next) => {
    const endpoint = await resolver.resolveDict("api.client.v2.beatmapsets");
    endpoint.GET(req, res);
  });

  logger.info("express-routes", "Loaded Beatmapset routes!");
};