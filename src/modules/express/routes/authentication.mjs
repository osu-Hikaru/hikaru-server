// Licensed under GPL v3 - Check Repository Root for full License notice.
// osu!Hikaru, a fully independent osu!Lazer Private Server backend.
// Copyright (C) 2023 Hikaru Team <copyright@hikaru.pw>

const logger = global.logger;
const resolver = global.resolver;

export default (expressInstance) => {
  logger.info("express-routes", "Loading Authentication routes...");

  expressInstance.post("/users", async (req, res, next) => {
    const endpoint = await resolver.resolveDict("api.client.users");
    endpoint.POST(req, res);
  });

  expressInstance.post("/oauth/token", async (req, res) => {
    const endpoint = await resolver.resolveDict("api.client.oauth.token");
    endpoint.POST(req, res);
  });

  expressInstance.all("*", async (req, res, next) => {
    const endpoint = await resolver.resolveDict("api.client.v2.validateJWT");
    endpoint.ALL(req, res, next);
  });

  logger.info("express-routes", "Loaded Authentication routes!");
};
