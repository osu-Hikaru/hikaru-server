// Licensed under GPL v3 - Check Repository Root for full License notice.
// osu!Hikaru, a fully independent osu!Lazer Private Server backend.
// Copyright (C) 2023 Hikaru Team <copyright@hikaru.pw>

import bcrypt from "bcrypt";

const database = global.database;
const logger = global.logger;

export const POST = async (req, res) => {
  try {
    if (
      !req.fields["user[username]"] ||
      !req.fields["user[user_email]"] ||
      !req.fields["user[password]"]
    ) {
      res.status(400);
      res.send();
      return;
    } else if (
      /^\w+$/gm.test(req.fields["user[username]"]) &&
      /^[a-zA-Z0-9_!?\-%&$]+$/gm.test(req.fields["user[password]"]) &&
      /[a-zA-Z0-9_!?\-%&$]+(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/g.test(
        req.fields["user[user_email]"]
      )
    ) {
      const salt = await bcrypt.genSaltSync(10);
      const hash = await bcrypt.hashSync(req.fields["user[password]"], salt);

      const newUser = await database.runQuery(
        `INSERT INTO accounts (username, email, password) VALUES (?,?,?)`,
        [
          String(req.fields["user[username]"]),
          String(req.fields["user[user_email]"]),
          String(hash),
        ]
      );

      res.status(200);
      res.send();
      return;
    } else {
      res.status(400);
      res.send();
      return;
    }
  } catch (err) {
    res.status(500);
    res.send();

    logger.error("express", err);

    return;
  }
};
