// Licensed under GPL v3 - Check Repository Root for full License notice.
// osu!Hikaru, a fully independent osu!Lazer Private Server backend.
// Copyright (C) 2021 Hikaru Team <copyright@hikaru.pw>

export default async (pool, req, res) => {
  const conn = await pool.getConnection();
  const message = [];

  try {
    conn.query(`SELECT * FROM channels`).then((dbRes) => {
      dbRes.forEach((result) => {
        message.push(result);
      });

      res.status(200);
      res.json(message);
      conn.end();
    });
  } catch (err) {
    conn.end();
    console.log(err);
    res.status(500);
    res.send();
    conn.end();
    return;
  }
};
