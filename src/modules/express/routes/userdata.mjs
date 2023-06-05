// Licensed under GPL v3 - Check Repository Root for full License notice.
// osu!Hikaru, a fully independent osu!Lazer Private Server backend.
// Copyright (C) 2023 Hikaru Team <copyright@hikaru.pw>

const logger = global.logger;
const resolver = global.resolver;

export default (expressInstance) => {
  logger.info("express-routes", "Loading userdata routes...");

  expressInstance.get("/v2/me", async (req, res) => {
    const endpoint = await resolver.resolveDict("api.client.v2.me");
    endpoint.GET(req, res);
  });

  expressInstance.get("/v2/friends", async (req, res) => {
    const endpoint = await resolver.resolveDict("api.client.v2.friends");
    endpoint.GET(req, res);
  });

  expressInstance.get("/v2/notifications", async (req, res) => {
    const endpoint = await resolver.resolveDict("api.client.v2.notifications");
    endpoint.GET(req, res);
  });

  logger.info("express-routes", "Loaded userdata routes!");
};
