// Licensed under GPL v3 - Check Repository Root for full License notice.
// osu!Hikaru, a fully independent osu!Lazer Private Server backend.
// Copyright (C) 2021 Hikaru Team <copyright@hikaru.pw>

export default async (pool, req, res) => {
  const conn = await pool.getConnection();
  const url = req.originalUrl.split("/");

  try {
    const token = await conn.query(
      `SELECT user_id FROM active_tokens WHERE access_token = ?`,
      [req.headers.authorization.split(" ")[1]]
    );

    const user = await conn.query(
      `SELECT * FROM users WHERE user_id = ? LIMIT 1`,
      token[0].user_id
    );

    const message_count = await conn.query(`SELECT count(*) FROM messages`);

    const messageID = Number(message_count[0]["count(*)"]) + 1;

    const channel = await conn.query(
      `SELECT channels.type, channels.channel_id, groups.identifier, groups.group_id
       FROM channels
       LEFT JOIN groups ON groups.group_id = channels.group_id
       WHERE channel_id = ? LIMIT 1`,
      [Number(url[4])]
    );

    switch (channel[0].type) {
      case "PUBLIC":
        sendMessage();
        break;
      case "SYSTEM":
        if (
          user[0].groups.split(",").some((r) => ["dev", "bot"].indexOf(r) >= 0)
        ) {
          sendMessage();
        } else {
          rejectMessage();
        }
        break;
      case "GROUP":
        if (
          user[0].groups
            .split(",")
            .some((r) => [channel[0].identifier].indexOf(r) >= 0)
        ) {
          sendMessage();
        } else {
          rejectMessage();
        }
        break;
      default:
        rejectMessage();
        break;
    }

    function rejectMessage() {
      res.status(400);
      res.json({
        error: "permission_denied",
        error_description:
          "You are currently not permitted to send messages to this channel.",
        hint: "Permission Denied",
        message:
          "The provided channel either does not accept messages or you do not have permission to send them. Please make sure you have appropriate permissions before attempting to send messages!",
      });
      conn.end();
      return;
    }

    async function sendMessage() {
      conn
        .query(
          `INSERT INTO messages (channel_id, user_id, timestamp, message_content, is_action) VALUES (?,?,?,?,?)`,
          [
            Number(url[4]),
            Number(user[0].user_id),
            new Date(Date.now()),
            String(req.body.message),
            req.body.is_action === "true",
          ]
        )
        .then(() => {
          res.status(200);
          res.json({
            channel_id: url[4],
            content: req.body.message,
            is_action: req.body.is_action,
            message_id: messageID,
            sender: {
              avatar_url: user[0].avatar_url,
              country_code: user[0].country_code,
              default_group: "default",
              id: user[0].user_id,
              is_active: Boolean(user[0].is_active),
              is_bot: Boolean(user[0].is_bot),
              is_deleted: Boolean(user[0].is_deleted),
              is_online: Boolean(user[0].is_online),
              is_supporter: Boolean(user[0].is_supporter),
              last_visit: new Date(Date.now()).toISOString(),
              pm_friends_only: false,
              profile_colour: null,
              username: user[0].username,
            },
            sender_id: user[0].user_id,
            timestamp: new Date(Date.now()).toISOString(),
          });

          conn
            .query(
              `SELECT last_read_id FROM chat_presence WHERE user_id = ? AND channel_id = ?`,
              [Number(user[0].user_id), Number(url[4])]
            )
            .then(async (lastRead) => {
              conn.query(
                `UPDATE chat_presence SET last_read_id = ? WHERE channel_id = ? AND user_id = ?`,
                [
                  Number(lastRead[0].last_read_id),
                  Number(user[0].user_id),
                  Number(url[4]),
                ]
              );
              conn.end();
              return;
            });
        });
    }
  } catch (err) {
    console.log(err);
    res.status(500);
    res.send();
    conn.end();
    return;
  }
};
