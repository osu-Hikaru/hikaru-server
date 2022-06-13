// Licensed under GPL v3 - Check Repository Root for full License notice.
// osu!Hikaru, a fully independent osu!Lazer Private Server backend.
// Copyright (C) 2021 Hikaru Team <copyright@hikaru.pw>

import bcrypt from "bcrypt";

export default async (pool, req, res) => {
  const conn = await pool.getConnection();
  const saltRounds = 10;

  try {
    const salt = await bcrypt.genSaltSync(saltRounds);
    const hash = await bcrypt.hashSync(req.body.user.password, salt);

    const passwordInsert = await conn.query(
      `INSERT INTO accounts (username, email, password) VALUES (?,?,?)`,
      [
        String(req.body.user.username),
        String(req.body.user.user_email),
        String(hash),
      ]
    );

    res.status(200);
    res.send();
    conn.end();
    return;
  } catch (err) {}
};
