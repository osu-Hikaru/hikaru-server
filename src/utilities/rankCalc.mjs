// Licensed under GPL v3 - Check Repository Root for full License notice.
// osu!Hikaru, a fully independent osu!Lazer Private Server backend.
// Copyright (C) 2021 Hikaru Team <copyright@hikaru.pw>

export default async (pool) => {
  console.log("Running rankCalc");
  const conn = await pool.getConnection();
  let modes = ["0", "1", "2", "3"];

  modes.forEach((mode) => {
    let i = 0;
    conn
      .query(`SELECT * FROM users_? ORDER BY pp DESC`, [Number(mode)])
      .then(async (dbRes) => {
        await dbRes.forEach((player) => {
          i++;
          conn.query(`UPDATE users_? SET global_rank = ? WHERE user_id = ?`, [
            Number(mode),
            i,
            player.user_id,
          ]);
        });
        conn.end();
        return;
      })
      .catch((err) => {
        console.log(err);
        conn.end();
        return;
      });
  });
};
