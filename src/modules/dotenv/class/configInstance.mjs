// Licensed under GPL v3 - Check Repository Root for full License notice.
// osu!Hikaru, a fully independent osu!Lazer Private Server backend.
// Copyright (C) 2023 Hikaru Team <copyright@hikaru.pw>

import { readdir } from "node:fs/promises";
import * as dotenv from "dotenv";

const logger = global.logger;

export default class {
  constructor() {}

  load = async (path) => {
    try {
      if (path === undefined) {
        let configFiles = await readdir(process.cwd() + "/src/env");

        configFiles.forEach((file) => {
          if (file.split(".").length >= 3) {
            dotenv.config({ path: process.cwd() + "/src/env/" + file });
            logger.notice(
              "dotenv",
              "Imported config from " + process.cwd() + "/src/env/" + file
            );
          }
        });
      } else {
        dotenv.notice({ path: path });
        logger.info("dotenv", "Imported config from " + path);
      }
    } catch (e) {
      logger.error("dotenv", e);
      logger.error("dotenv", "Failed to import config from " + path);
    }
  };
}
