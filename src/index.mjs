// Licensed under GPL v3 - Check Repository Root for full License notice.
// osu!Hikaru, a fully independent osu!Lazer Private Server backend.
// Copyright (C) 2021 Hikaru Team <copyright@hikaru.pw>

// Utilities

import genToken from "./utilities/genToken.mjs";
import genNumber from "./utilities/genNumber.mjs";
import updateUserStatus from "./utilities/updateUserStatus.mjs";
import logMariadbStats from "./utilities/logMariadbStats.mjs";
import rankCalc from "./utilities/rankCalc.mjs";
import checkActiveTokens from "./utilities/checkActiveTokens.mjs";
import ftpUpload from "./utilities/ftpUpload.mjs";
import sqlToOsuDate from "./utilities/sqlToOsuDate.mjs";
import importBeatmap from "./utilities/importBeatmap.mjs";
import resolveModeByName from "./utilities/resolveModeByName.mjs";

// Endpoints

import postUsers from "./endpoints/postUsers.mjs";
import oauth from "./endpoints/oauth.mjs";
import getUsers from "./endpoints/getUsers.mjs";
import getMe from "./endpoints/getMe.mjs";
import allRoutes from "./endpoints/allRoutes.mjs";
import getChatUpdates from "./endpoints/getChatUpdates.mjs";
import getChannels from "./endpoints/getChannels.mjs";
import getFriends from "./endpoints/getFriends.mjs";
import getSeasonals from "./endpoints/getSeasonals.mjs";
import putChannelUsers from "./endpoints/putChannelUsers.mjs";
import putChannelMAS from "./endpoints/putChannelMAS.mjs";
import delChannelUsers from "./endpoints/delChannelUsers.mjs";
import getMessages from "./endpoints/getMessages.mjs";
import postChannels from "./endpoints/postChannels.mjs";
import postChannelMessages from "./endpoints/postChannelMessages.mjs";
import putBeatmapScores from "./endpoints/putBeatmapScores.mjs";
import getBeatmapScores from "./endpoints/getBeatmapScores.mjs";
import postBeatmapScores from "./endpoints/postBeatmapScores.mjs";
import getLookupBeatmap from "./endpoints/getLookupBeatmap.mjs";
import getNews from "./endpoints/getNews.mjs";
import getBeatmapSearch from "./endpoints/getBeatmapSearch.mjs";
import getBeatmapsets from "./endpoints/getBeatmapsets.mjs";
import getDownloadBeatmap from "./endpoints/getDownloadBeatmap.mjs";
import getRankings from "./endpoints/getRankings.mjs";

// osu!API Routes

import oapiAuthorization from "./osu-api/Authorization.mjs";
import oapiLazerAuthorization from "./osu-api/LazerAuthorization.mjs";
import oapiGetBeatmap from "./osu-api/GetBeatmap.mjs";
import oapiBeatmapSearch from "./osu-api/BeatmapSearch.mjs";
import oapiGetBeatmapset from "./osu-api/GetBeatmapset.mjs";
import oapiDownloadBeatmap from "./osu-api/DownloadBeatmap.mjs";

// Umineko

import umiInit from "./umineko/init.mjs";
import umiMessageListener from "./umineko/messageListener.mjs";
import umiRoll from "./umineko/roll.mjs";
import umiUptime from "./umineko/uptime.mjs";

// Imports

export {
  genToken as genToken,
  genNumber as genNumber,
  updateUserStatus as updateUserStatus,
  logMariadbStats as logMariadbStats,
  rankCalc as rankCalc,
  checkActiveTokens as checkActiveTokens,
  ftpUpload as ftpUpload,
  sqlToOsuDate as sqlToOsuDate,
  importBeatmap as importBeatmap,
  resolveModeByName as resolveModeByName,
  //-------------------------------
  postUsers as postUsers,
  oauth as oauth,
  getUsers as getUsers,
  getMe as getMe,
  allRoutes as allRoutes,
  getChatUpdates as getChatUpdates,
  getChannels as getChannels,
  getFriends as getFriends,
  getSeasonals as getSeasonals,
  putChannelUsers as putChannelUsers,
  putChannelMAS as putChannelMAS,
  delChannelUsers as delChannelUsers,
  getMessages as getMessages,
  postChannels as postChannels,
  postChannelMessages as postChannelMessages,
  putBeatmapScores as putBeatmapScores,
  getBeatmapScores as getBeatmapScores,
  postBeatmapScores as postBeatmapScores,
  getLookupBeatmap as getLookupBeatmap,
  getNews as getNews,
  getBeatmapSearch as getBeatmapSearch,
  getBeatmapsets as getBeatmapsets,
  getDownloadBeatmap as getDownloadBeatmap,
  getRankings as getRankings,
  //-------------------------------
  oapiAuthorization as oapiAuthorization,
  oapiLazerAuthorization as oapiLazerAuthorization,
  oapiGetBeatmap as oapiGetBeatmap,
  oapiBeatmapSearch as oapiBeatmapSearch,
  oapiGetBeatmapset as oapiGetBeatmapset,
  oapiDownloadBeatmap as oapiDownloadBeatmap,
  //-------------------------------
  umiInit as umiInit,
  umiMessageListener as umiMessageListener,
  umiRoll as umiRoll,
  umiUptime as umiUptime,
};
