// Licensed under GPL v3 - Check Repository Root for full License notice.
// osu!Hikaru, a fully independent osu!Lazer Private Server backend.
// Copyright (C) 2023 Hikaru Team <copyright@hikaru.pw>

import express from "express";
import ExpressFormidable from "express-formidable";
import morgan from "morgan";

const logger = global.logger;
const resolver = global.resolver;
export default class {
  #instance;

  constructor() {
    this.#instance = express();
    this.#instance.use(ExpressFormidable());

    if (process.env.MORGAN_ENABLED === "true") {
      this.#instance.use(morgan(process.env.MORGAN_FORMAT));

      logger.notice(
        "morgan",
        "Hello from Morgan! We are initiated with the " +
          process.env.MORGAN_FORMAT +
          " format!"
      );
    }
    this.#loadCustomRoutes();
    this.#startListen();
  }

  #loadBaseRoutes = () => {
    this.#instance.all("/v2/*", (req, res, next) => {
      res.status(404);
      res.send();
    });
  };

  #loadCustomRoutes = async () => {
    // Authentication

    const authenticationRoutes = await resolver.resolveDict(
      "modules.express.routes.authentication"
    );

    authenticationRoutes(this.#instance);

      // Beatmaps

    const beatmapRoutes = await resolver.resolveDict(
      "modules.express.routes.beatmaps"
    );

    beatmapRoutes(this.#instance);

    // Developer

    const developerRoutes = await resolver.resolveDict(
      "modules.express.routes.developer"
    );

    developerRoutes(this.#instance);

    // System

    const systemRoutes = await resolver.resolveDict(
      "modules.express.routes.system"
    );

    systemRoutes(this.#instance);

    // Userdata

    const userdataRoutes = await resolver.resolveDict(
      "modules.express.routes.userdata"
    );

    userdataRoutes(this.#instance);
  };

  #startListen = () => {
    logger.notice("express", "Awaiting startup delay...");

    setTimeout(() => {
      this.#loadBaseRoutes();
      this.#instance.listen(process.env.EXPRESS_PORT, () => {
        logger.notice(
          "express",
          `Hello from Express! We have initiated ${
            this.#instance._router.stack.length
          } routes and are listening for requests on port ${
            process.env.EXPRESS_PORT
          }!`
        );
      });
    }, 1000 * 1);
  };
}
