// Licensed under GPL v3 - Check Repository Root for full License notice.
// osu!Hikaru, a fully independent osu!Lazer Private Server backend.
// Copyright (C) 2021 Hikaru Team <copyright@hikaru.pw>

export const GET = async (req, res) => {
  try {
    res.status(200);
    res.json({
      ends_at: "2099-01-01T16:00:00+00:00",
      backgrounds: [
        {
          url: "https://a.hikaru.pw/seasonals/s_0.jpg",
          user: {
            avatar_url: null,
            country_code: null,
            default_group: "default",
            id: null,
            is_active: false,
            is_bot: false,
            is_deleted: false,
            is_online: false,
            is_supporter: false,
            last_visit: null,
            pm_friends_only: false,
            profile_colour: null,
            username: null,
          },
        },
      ],
    });
  } catch (e) {
    console.log(e);
  } finally {
  }
};
