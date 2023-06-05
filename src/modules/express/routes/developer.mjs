// Licensed under GPL v3 - Check Repository Root for full License notice.
// osu!Hikaru, a fully independent osu!Lazer Private Server backend.
// Copyright (C) 2023 Hikaru Team <copyright@hikaru.pw>

const logger = global.logger;
const resolver = global.resolver;

export default (expressInstance) => {
  logger.info("express-routes", "Loading developer routes...");

  expressInstance.get("/v2/developer/getSystemStats", async (req, res) => {
    const endpoint = await resolver.resolveDict(
      "api.client.v2.developer.getSystemStats"
    );
    endpoint.GET(req, res);
  });

  logger.info("express-routes", "Loaded developer routes!");
};
