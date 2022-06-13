// Licensed under GPL v3 - Check Repository Root for full License notice.
// osu!Hikaru, a fully independent osu!Lazer Private Server backend.
// Copyright (C) 2021 Hikaru Team <copyright@hikaru.pw>

// TODO: Major rewrite of basically every SQL Statement

const runtime = Date.now();

console.log(`Starting Hikaru...`);

import express from "express";
import morgan from "morgan";
import multer from "multer";
import mariadb from "mariadb";
import compression from "compression";
import fs from "fs";
import * as modules from "./index.mjs";
import * as bodyparser from "body-parser";

const api = express();
const upload = multer();

console.log(`Created Express @ ${Date.now() - runtime}ms...`);

const config = JSON.parse(
  await fs.readFileSync("./src/config.json", "utf-8", () => {})
);

console.log(`Loaded config @ ${Date.now() - runtime}ms...`);

const pool = await mariadb.createPool({
  host: config.mariadb.host,
  user: config.mariadb.user,
  password: config.mariadb.password,
  database: config.mariadb.database,
  connectionLimit: config.mariadb.connectionLimit,
  idleTimeout: 60,
});

if (config.mariadb.dbDebug === true) {
  pool.on("connection", (conn) => {
    console.log(`Connection ${conn.threadId} has been created in pool.`);
  });

  pool.on("aquire", (conn) => {
    console.log(`Connection ${conn.threadId} has been aquired from pool.`);
  });

  pool.on("release", (conn) => {
    console.log(`Connection ${conn.threadId} has been released from pool.`);
  });

  pool.on("enqueue", (conn) => {
    console.log(`Command ${conn} has been enqueued.`);
  });
}

console.log(
  `Connection to pool established! Starting Routines @ ${
    Date.now() - runtime
  }ms...`
);

modules.logMariadbStats(pool);

modules.oapiAuthorization().then(() => {
  setTimeout(() => {
    modules.oapiLazerAuthorization().then(() => {
      if (config.umineko.enabled === true) {
        console.log(`Loading Umineko @ ${Date.now() - runtime}ms...`);

        setTimeout(() => {
          modules.umiInit(pool, config);
        }, 1000);
      }
    });
  }, 1000);
});

setInterval(function () {
  modules.updateUserStatus(pool, config);
}, 1000 * 60 * 5);

setInterval(function () {
  modules.logMariadbStats(pool);
}, 1000 * 60 * 2);

setInterval(function () {
  modules.rankCalc(pool);
}, 1000 * 60 * 1);

setInterval(function () {
  modules.checkActiveTokens(pool);
}, 1000 * 60 * 60);

console.log(`Loading Express Modules @ ${Date.now() - runtime}ms...`);

api.use(morgan("dev"));
api.use(bodyparser.default.json());
api.use(bodyparser.default.urlencoded({ extended: true }));
api.use(compression());

console.log(`Loading Express Routes @ ${Date.now() - runtime}ms...`);

api.post("/", upload.none(), async (req, res) => {
  modules.postUsers(pool, req, res);
});

api.post("/token", upload.none(), async (req, res) => {
  modules.oauth(pool, req, res);
});

api.all("*", async (req, res, next) => {
  modules.allRoutes(pool, req, res, next);
});

api.get("/v2/me", async (req, res) => {
  modules.getMe(pool, req, res);
});

api.get("/v2/users/*/*", async (req, res) => {
  modules.getUsers(pool, req, res);
});

api.get("/v2/chat/updates", async (req, res) => {
  modules.getChatUpdates(pool, req, res);
});

api.get("/v2/chat/channels", async (req, res) => {
  modules.getChannels(pool, req, res);
});

api.get("/v2/friends", (req, res) => {
  modules.getFriends(pool, req, res);
});

api.get("/v2/seasonal-backgrounds", (req, res) => {
  modules.getSeasonals(pool, req, res);
});

api.put("/v2/chat/channels/*/users/*", async (req, res) => {
  modules.putChannelUsers(pool, req, res);
});

api.put("/v2/chat/channels/*/mark-as-read/*", async (req, res) => {
  modules.putChannelMAS(pool, req, res);
});

api.delete("/v2/chat/channels/*/users/*", async (req, res) => {
  modules.delChannelUsers(pool, req, res);
});

api.get("/v2/chat/channels/*/messages", (req, res) => {
  modules.getMessages(pool, req, res);
});

api.post("/v2/chat/channels", upload.none(), async (req, res) => {
  modules.postChannels(pool, req, res);
});

api.post("/v2/chat/channels/*/messages", upload.none(), async (req, res) => {
  modules.postChannelMessages(pool, req, res);
});

api.put("/v2/beatmaps/*/solo/scores/*", async (req, res) => {
  modules.putBeatmapScores(pool, req, res);
});

api.get("/v2/beatmaps/*/scores", (req, res) => {
  modules.getBeatmapScores(pool, req, res);
});

api.get("/v2/beatmaps/lookup", (req, res) => {
  modules.getLookupBeatmap(pool, req, res);
});

api.post("/v2/beatmaps/*/solo/scores", upload.none(), async (req, res) => {
  modules.postBeatmapScores(pool, req, res);
});

api.get("/v2/news", async (req, res) => {
  modules.getNews(pool, req, res);
});

api.get("/v2/beatmapsets/*/download", async (req, res) => {
  modules.getDownloadBeatmap(pool, req, res);
});

api.get("/v2/beatmapsets/*", async (req, res) => {
  modules.getBeatmapsets(pool, req, res);
});

api.get("/v2/beatmapsets/search", async (req, res) => {
  modules.getBeatmapSearch(pool, req, res);
});

api.get("/v2/rankings/*/*", async (req, res) => {
  modules.getRankings(pool, req, res);
});

api.all("*", (req, res) => {
  res.status(404);
  res.json({ message: "Not found." });
});

console.log(`Starting to Listen for requests @ ${Date.now() - runtime}ms...`);

api.listen(config.express.port, () => {
  console.log(
    `Startup complete!\nPort: ${config.express.port}\nStartup Time: ${
      Date.now() - runtime
    }ms`
  );
});
