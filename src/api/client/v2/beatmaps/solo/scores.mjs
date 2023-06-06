// Licensed under GPL v3 - Check Repository Root for full License notice.
// osu!Hikaru, a fully independent osu!Lazer Private Server backend.
// Copyright (C) 2023 Hikaru Team <copyright@hikaru.pw>

// TODO: Experimental endpoint

const database = global.database;
const lazer = global.lazer;
const logger = global.logger;

export const POST = async (req, res) => {
  try {
    if (
      !req.fields.version_hash ||
      !req.fields.beatmap_hash ||
      !req.fields.ruleset_id
    ) {
      res.status(400);
      res.send();
    } else {
      const versionHash = req.fields.version_hash;
      const beatmapHash = req.fields.beatmap_hash;
      const rulesetID = req.fields.ruleset_id;
      const userID = res.JWT.client_id;

      if (
        process.env.SERVER_WHITELISTED_VERSIONS.split(",").indexOf(
          versionHash
        ) > -1
      ) {
        const beatmap = await lazer.getBeatmap(
          undefined,
          undefined,
          beatmapHash
        );

        const maxScoreID = await database.runQuery(
          "SELECT MAX(score_id) FROM scores WHERE ruleset_id = ?",
          [Number(rulesetID)]
        );

        const scoreQuery = database.generateSQLInsertOrUpdateQuery(
          "playactivity",
          {
            score_id:
              maxScoreID[0]["MAX(score_id)"] == null
                ? 1
                : Number(maxScoreID[0]["MAX(score_id)"]) + 1,
            user_id: userID,
            beatmap_id: beatmap.data.id,
            created_at: new Date(Date.now()),
            ruleset_id: rulesetID,
          }
        );

        await database.runQuery(scoreQuery.query, scoreQuery.values);

        res.status(200);
        res.json({
          beatmap_id: beatmap.data.id,
          created_at: new Date(Date.now()).toISOString(),
          id: scoreQuery.values[0],
          user_id: userID,
        });
      } else {
        res.status(400);
        res.send();
      }
    }
  } catch (err) {
    res.status(500);
    res.send();

    logger.error("express", err);

    return;
  } finally {
  }
};

// TODO: Experimental endpoint

export const PUT = async (req, res) => {
  try {
    const userActivePlay = await database.runQuery(
      "SELECT * FROM playactivity WHERE user_id = ?",
      [Number(res.JWT.client_id)]
    );

    const reqURL = req.url.split("/");

    if (
      Number(reqURL[3]) === userActivePlay[0].beatmap_id &&
      Number(reqURL[6]) === userActivePlay[0].score_id &&
      Number(req.fields.ruleset_id) === userActivePlay[0].ruleset_id
    ) {
      let originalPostFields = req.fields;
      let modifiedPostFields = originalPostFields;

      delete modifiedPostFields.maximum_statistics;

      modifiedPostFields = flattenJSON(modifiedPostFields);

      const playactivityQuery = database.generateSQLInsertOrUpdateQuery(
        "playactivity",
        {
          user_id: res.JWT.client_id,
          score_id: null,
          beatmap_id: null,
          created_at: null,
          ruleset_id: null,
        }
      );

      await database.runQuery(
        playactivityQuery.query,
        playactivityQuery.values
      );

      const scoreQuery = database.generateSQLInsertQuery("scores", {
        ...modifiedPostFields,
        score_id: Number(userActivePlay[0].score_id),
        user_id: Number(res.JWT.client_id),
        beatmap_id: Number(userActivePlay[0].beatmap_id),
      });

      await database.runQuery(scoreQuery.query, scoreQuery.values);

      res.status(200);
      res.json({
        ...originalPostFields,
        beatmap_id: userActivePlay[0].beatmap_id,
        build_id: 6943,
        best_id: null,
        current_user_attributes: {
          pin: {
            is_pinned: false,
            score_id: userActivePlay[0].score_id,
            score_type: "solo_score",
          },
        },
        ended_at: new Date(Date.now()).toISOString(),
        id: userActivePlay[0].score_id,
        legacy_perfect: null,
        mods: [],
        pp: null,
        replay: false,
        started_at: userActivePlay[0].created_at,
        type: "solo_score",
        user_id: Number(res.JWT.client_id),
      });
    } else {
      res.status(400);
      res.send();
    }
  } catch (err) {
    res.status(500);
    res.send();

    logger.error("express", err);

    return;
  } finally {
  }
};

// TODO: Globalize Function

function flattenJSON(json) {
  const result = {};

  function flatten(obj) {
    for (const key in obj) {
      const value = obj[key];
      const newKey = key;

      if (typeof value === "object" && !Array.isArray(value)) {
        flatten(value);
      } else {
        result[newKey] = value;
      }
    }
  }

  flatten(json);
  return result;
}
