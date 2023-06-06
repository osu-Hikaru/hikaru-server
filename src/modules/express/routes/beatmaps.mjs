// Licensed under GPL v3 - Check Repository Root for full License notice.
// osu!Hikaru, a fully independent osu!Lazer Private Server backend.
// Copyright (C) 2023 Hikaru Team <copyright@hikaru.pw>

const logger = global.logger;
const resolver = global.resolver;

export default (expressInstance) => {
  logger.info("express-routes", "Loading Beatmap routes...");

  expressInstance.get("/v2/beatmaps/lookup", async (req, res, next) => {
    const endpoint = await resolver.resolveDict(
      "api.client.v2.beatmaps.lookup"
    );
    endpoint.GET(req, res);
  });

  expressInstance.post("/v2/beatmaps/*/solo/scores", async (req, res, next) => {
    const endpoint = await resolver.resolveDict(
      "api.client.v2.beatmaps.solo.scores"
    );
    endpoint.POST(req, res);
  });

  expressInstance.put(
    "/v2/beatmaps/*/solo/scores/*",
    async (req, res, next) => {
      const endpoint = await resolver.resolveDict(
        "api.client.v2.beatmaps.solo.scores"
      );
      endpoint.PUT(req, res);
    }
  );

  logger.info("express-routes", "Loaded Beatmap routes!");
};
