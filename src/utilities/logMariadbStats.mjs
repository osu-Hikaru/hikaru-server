// Licensed under GPL v3 - Check Repository Root for full License notice.
// osu!Hikaru, a fully independent osu!Lazer Private Server backend.
// Copyright (C) 2021 Hikaru Team <copyright@hikaru.pw>

export default async (pool) => {
  console.log({
    "Total Connections": pool.totalConnections(),
    "Active Connections": pool.activeConnections(),
    "Idle Connections": pool.idleConnections(),
  });
};