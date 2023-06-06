// Licensed under GPL v3 - Check Repository Root for full License notice.
// osu!Hikaru, a fully independent osu!Lazer Private Server backend.
// Copyright (C) 2023 Hikaru Team <copyright@hikaru.pw>

const database = global.database;
const logger = global.logger;

export default class {
  #available;
  #botAccount;
  #channels;

  constructor() {
    this.#initiateBot();
    this.#getChannels();

    logger.notice("umineko", "Hello from Umineko!");
  }

  getAvailability = async () => {
    return this.#available;
  };

  #initiateBot = async () => {
    this.#botAccount = await database.runQuery(
      `SELECT * FROM users WHERE user_id = ? LIMIT 1`,
      [process.env.UMINEKO_ID]
    );

    if (this.#botAccount[0] === undefined) {
      this.#available = false;
      logger.error(
        "umineko",
        "Bot user account not found. Umineko will be unavailable."
      );
    } else {
      this.#available = true;
    }
  };

  #getChannels = async () => {
    this.#channels = await database.runQuery("SELECT * FROM channels");
  };
}
