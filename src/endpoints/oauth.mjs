// Licensed under GPL v3 - Check Repository Root for full License notice.
// osu!Hikaru, a fully independent osu!Lazer Private Server backend.
// Copyright (C) 2021 Hikaru Team <copyright@hikaru.pw>

import bcrypt from "bcrypt";
import * as modules from "../index.mjs";

export default async (pool, req, res) => {
  const conn = await pool.getConnection();

  try {
    if (req.body.refresh_token !== undefined) {
      const access_token = await modules.genToken(512);
      const expires_in = await modules.genNumber(65000, 70000);
      const refresh_token = await modules.genToken(512);

      const tokenQuery = await conn.query(
        `SELECT * FROM active_tokens WHERE refresh_token = ? LIMIT 1`,
        [String(req.body.refresh_token)]
      );

      const deleteRefresh = await conn.query(
        `DELETE FROM active_tokens WHERE refresh_token = ?`,
        [String(req.body.refresh_token)]
      );

      const genNewToken = await conn.query(
        `INSERT INTO active_tokens (user_id, access_token, expires_in, refresh_token) VALUES (?, ?, ?, ?)`,
        [
          Number(tokenQuery[0].user_id),
          String(access_token),
          Number(expires_in),
          String(refresh_token),
        ]
      );

      res.status(200);
      res.json({
        access_token: access_token,
        expires_in: expires_in,
        refresh_token: refresh_token,
        token_type: "Bearer",
      });
      conn.end();
    } else if (req.body.username && req.body.password) {
      const checkUser = await conn.query(
        `SELECT * FROM accounts WHERE username = ? LIMIT 1`,
        [String(req.body.username)]
      );

      if (checkUser[0] === undefined) {
        res.status(400);
        res.send();
        conn.end();
        return;
      } else {
        const compareResult = await bcrypt.compareSync(
          String(req.body.password),
          checkUser[0].password
        );

        if (compareResult === true) {
          const access_token = await modules.genToken(512);
          const expires_in = await modules.genNumber(65000, 70000);
          const refresh_token = await modules.genToken(512);

          const generateToken = await conn.query(
            `INSERT INTO active_tokens (user_id, access_token, expires_in, refresh_token) VALUES (?, ?, ?, ?)`,
            [
              Number(checkUser[0].user_id),
              String(access_token),
              Number(expires_in),
              String(refresh_token),
            ]
          );

          res.status(200);
          res.json({
            access_token: access_token,
            expires_in: expires_in,
            refresh_token: refresh_token,
            token_type: "Bearer",
          });
          conn.end();
          return;
        } else {
          res.status(400);
          res.send();
          conn.end();
          return;
        }
      }
    } else {
      res.status(403);
      res.json({ message: "No authorization provided." });
      conn.end();
      return;
    }
  } catch (err) {
    console.log(err);
    res.status(500);
    res.send();
    conn.end();
    return;
  }
};
