// Licensed under GPL v3 - Check Repository Root for full License notice.
// osu!Hikaru, a fully independent osu!Lazer Private Server backend.
// Copyright (C) 2021 Hikaru Team <copyright@hikaru.pw>

import fs from "node:fs/promises";
import jwt from "jsonwebtoken";

const database = global.database;

export const ALL = async (req, res, next) => {
  try {
    if (req.headers.authorization !== undefined) {
      jwt.verify(
        req.headers.authorization.split(" ")[1],
        await fs.readFile("./src/secrets/jwtRS256.key.pub", "utf-8"),
        {},
        async (err, decoded) => {
          if (err) {
            console.log(err);
            res.status(403);
            res.send();
            return;
          }

          if (decoded.iss === "osu!Hikaru") {
            res.JWT = decoded;

            await database.runQuery(
              `UPDATE users SET last_visit = DEFAULT, is_online = 1 WHERE user_id = ?`,
              [String(res.JWT.client_id)]
            );

            next();
            return;
          }
        }
      );
    }
  } catch (err) {
    console.log(err);
    res.status(500);
    res.send();
    return;
  }
};
