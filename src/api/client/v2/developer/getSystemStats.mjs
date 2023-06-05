// Licensed under GPL v3 - Check Repository Root for full License notice.
// osu!Hikaru, a fully independent osu!Lazer Private Server backend.
// Copyright (C) 2022 Hikaru Team <copyright@hikaru.pw>

import * as si from "systeminformation";

const database = global.database;

export const GET = async (req, res) => {
  try {
    if (await checkUserGroups(res, "dev")) {
      let cpuBase = await si.cpu();
      let cpuSpeed = await si.cpuCurrentSpeed();
      let memBase = await si.mem();
      let osBase = await si.osInfo();
      //let loadBase = await si.currentLoad();
      let diskBase = await si.diskLayout();
      //let diskIO = await si.disksIO();
      let diskSize = await si.fsSize();
      let netStats = await si.networkStats();

      res.status(200);
      res.json({
        cpu: {
          manufacturer: cpuBase.manufacturer,
          brand: cpuBase.brand,
          vendor: cpuBase.vendor,
          speed: cpuSpeed,
          cores: cpuBase.cores,
        },
        memory: {
          total:
            String(Number(Number(memBase.total) * 0.000001).toFixed(0)) + " MB",
          free:
            String(Number(Number(memBase.free) * 0.000001).toFixed(0)) + " MB",
          used:
            String(Number(Number(memBase.used) * 0.000001).toFixed(0)) + " MB",
          active:
            String(Number(Number(memBase.active) * 0.000001).toFixed(0)) +
            " MB",
        },
        os: {
          platform: osBase.platform,
          distro: osBase.distro,
          release: osBase.release,
          codename: osBase.codename,
          kernel: osBase.kernel,
          arch: osBase.arch,
          hostname: osBase.hostname,
        },
        disk: {
          total:
            String(Number(Number(diskBase[0].size) * 0.000001).toFixed(0)) +
            " MB",
          detailed: diskSize,
        },
        network: {
          read:
            String(Number(Number(netStats[0].rx_sec) * 0.000001).toFixed(2)) +
            " MB",
          write:
            String(Number(Number(netStats[0].tx_sec) * 0.000001).toFixed(2)) +
            " MB",
        },
      });
    } else {
      res.status(403);
      res.send();
    }
  } catch (err) {
    console.log(err);
    res.status(500);
    res.send();
  }
};

async function checkUserGroups(res, chk) {
  try {
    let userGroups = await database.runQuery(
      "SELECT groups FROM users WHERE user_id = ? LIMIT 1",
      [res.JWT.user_id]
    );

    if (userGroups[0].groups.split(",").indexOf(chk) > -1) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    return err;
  }
}
