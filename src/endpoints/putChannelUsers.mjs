// Licensed under GPL v3 - Check Repository Root for full License notice.
// osu!Hikaru, a fully independent osu!Lazer Private Server backend.
// Copyright (C) 2021 Hikaru Team <copyright@hikaru.pw>

// TODO: Lmao this shit doesnt do join checks

export default async (pool, req, res) => {
  const conn = await pool.getConnection();
  const url = req.originalUrl.split("/");

  const dbResToken = await conn
    .query(`SELECT user_id FROM active_tokens WHERE access_token = ?`, [
      req.headers.authorization.split(" ")[1],
    ])
    .catch((err) => {
      console.log(err);
      res.status(500);
      res.send();
      conn.end();
      return;
    });

  if (url[7] === dbResToken.user_id) {
    await conn
      .query(
        `INSERT INTO chat_presence (user_id, channel_id, can_message) VALUES (?,?,?)`,
        [Number(dbResToken[0].user_id), Number(url[4]), Number(true)]
      )
      .then(async (dbResChatPresence) => {
        await conn
          .query(`SELECT * FROM channels WHERE channel_id = ? LIMIT 1`, [
            Number(url[4]),
          ])
          .then(async (dbResChannel) => {
            await conn
              .query(
                `SELECT message_id from messages WHERE channel_id = ? ORDER BY message_id DESC LIMIT 1`,
                [dbResChannel[0].channel_id]
              )
              .then((dbChannelLast) => {
                let last_message_id;

                if (dbChannelLast[0] === undefined) {
                  last_message_id = 0;
                } else {
                  last_message_id = Number(dbChannelLast[0].message_id);
                }

                conn.end();
                res.status(200);
                res.json({
                  channel_id: Number(url[5]),
                  current_user_attributes: {
                    can_message: Boolean(true),
                    last_read_id: Number(null),
                  },
                  description: String(dbResChannel[0].description),
                  icon: String(dbResChannel[0].icon),
                  last_message_id: last_message_id,
                  last_read_id: null,
                  moderated: Boolean(dbResChannel[0].moderated),
                  name: String(dbResChannel[0].name),
                  type: String(dbResChannel[0].type),
                  users: [],
                });
                return;
              })
              .catch((err) => {
                console.log(err);
                res.status(500);
                res.send();
                conn.end();
                return;
              });
          })
          .catch((err) => {
            console.log(err);
            res.status(500);
            res.send();
            conn.end();
            return;
          })
          .catch((err) => {
            console.log(err);
            res.status(500);
            res.send();
            conn.end();
            return;
          });
      })
      .catch((err) => {
        console.log(err);
        res.status(500);
        res.send();
        conn.end();
        return;
      });
  } else {
    res.status(403);
    res.send();
  }
};
