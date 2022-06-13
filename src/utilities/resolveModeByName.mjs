// Licensed under GPL v3 - Check Repository Root for full License notice.
// osu!Hikaru, a fully independent osu!Lazer Private Server backend.
// Copyright (C) 2021 Hikaru Team <copyright@hikaru.pw>

export default async (modeName) => {
  try {
    switch (modeName.toLowerCase()) {
      case "osu":
      default:
        return { mode: "osu", mode_int: 0 };
      case "taiko":
        return { mode: "taiko", mode_int: 1 };
      case "fruits":
        return { mode: "fruits", mode_int: 2 };
      case "mania":
        return { mode: "mania", mode_int: 3 };
    }
  } catch (err) {
    return err;
  }
};
