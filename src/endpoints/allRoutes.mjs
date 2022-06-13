// Licensed under GPL v3 - Check Repository Root for full License notice.
// osu!Hikaru, a fully independent osu!Lazer Private Server backend.
// Copyright (C) 2021 Hikaru Team <copyright@hikaru.pw>

export default async (pool, req, res, next) => {
  const conn = await pool.getConnection();

  try {
    if (req.headers.authorization !== undefined) {
      const tokenCheck = await conn.query(
        `SELECT * FROM active_tokens WHERE access_token = ? LIMIT 1`,
        [String(req.headers.authorization.split(" ")[1])]
      );

      if (tokenCheck[0] === undefined) {
        res.status(400);
        res.send();
        conn.end();
        return;
      } else {
        if (tokenCheck[0].created_at + tokenCheck[0].expires_in < Date.now()) {
          res.status(400);
          res.send();
          conn.end();
          return;
        } else {
          const updateUserOnline = await conn.query(
            `UPDATE users SET last_visit = DEFAULT, is_online = 1 WHERE user_id = ?`,
            [String(tokenCheck[0].user_id)]
          );

          next();
          conn.end();
          return;
        }
      }
    } else {
      res.status(401);
      res.json({ message: "Unauthorized." });
      conn.end();
      return;
    }
  } catch (err) {
    res.status(500);
    res.json({});
    console.log(err);
  }
};
