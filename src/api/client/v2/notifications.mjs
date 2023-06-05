// Licensed under GPL v3 - Check Repository Root for full License notice.
// osu!Hikaru, a fully independent osu!Lazer Private Server backend.
// Copyright (C) 2021 Hikaru Team <copyright@hikaru.pw>

export const GET = async (req, res) => {
  try {
    res.status(200);
    res.json({
        "notification_endpoint": "wss://notify.hikaru.pw",
        "notifications": []
    });
  } catch (e) {
    console.log(e);
  } finally {
  }
};
