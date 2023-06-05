// Licensed under GPL v3 - Check Repository Root for full License notice.
// osu!Hikaru, a fully independent osu!Lazer Private Server backend.
// Copyright (C) 2023 Hikaru Team <copyright@hikaru.pw>

const logger = global.logger;
const resolver = global.resolver;

export default (expressInstance) => {
  logger.info("express-routes", "Loading system routes...");

  expressInstance.get("/v2/seasonal-backgrounds", async (req, res) => {
    const endpoint = await resolver.resolveDict(
      "api.client.v2.seasonal-backgrounds"
    );
    endpoint.GET(req, res);
  });

  logger.info("express-routes", "Loaded system routes!");
};
