// Licensed under GPL v3 - Check Repository Root for full License notice.
// osu!Hikaru, a fully independent osu!Lazer Private Server backend.
// Copyright (C) 2023 Hikaru Team <copyright@hikaru.pw>

import mariadb from "mariadb";

const logger = global.logger;

export default class {
  #connectionLimit = 10;
  #pool = undefined;

  constructor() {
    this.#connectDatabase();
  }

  #connectDatabase = async () => {
    this.#pool = await mariadb.createPool({
      host: process.env.MARIADB_HOST,
      user: process.env.MARIADB_USERNAME,
      password: process.env.MARIADB_PASSWORD,
      database: process.env.MARIADB_DATABASE,
      connectionLimit: this.#connectionLimit,
      idleTimeout: 60,
    });

    logger.notice(
      "mariadb",
      "Hello from MariaDB! We have successfully authenticated!"
    );
  };

  getPool = () => {
    process.emitWarning(
      "getPool is simply a function to retain compatibility with old, not yet converted functions. " +
        "Consider switching to the new query methods, as this will cease to work in the near future.",
      "DeprecationWarning"
    );
    return this.#pool;
  };

  runQuery = async (query, params) => {
    const conn = await this.#pool.getConnection();
    const result = await conn.query(query, params);

    conn.end();

    return result;
  };
}
