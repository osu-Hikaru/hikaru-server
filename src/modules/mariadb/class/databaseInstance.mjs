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

  generateSQLSelectQuery = (tableName, jsonObj) => {
    const fields = Object.keys(jsonObj);
    const values = Object.values(jsonObj).map((value) =>
      typeof value === "string" &&
      /^(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z)$/gm.test(value)
        ? this.formatDate(new Date(value))
        : value
    );

    const conditions = fields
      .map((field, index) => `\`${field}\` = ?`)
      .join(" AND ");
    const query = `SELECT * FROM ${tableName} WHERE ${conditions}`;

    return { query, values };
  };

  generateSQLInsertQuery = (tableName, jsonObj) => {
    const fields = Object.keys(jsonObj);
    const values = Object.values(jsonObj).map((value) =>
      typeof value === "string" &&
      /^(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z)$/gm.test(value)
        ? this.formatDate(new Date(value))
        : value
    );

    const placeholders = fields.map(() => "?").join(",");
    const fieldsWithBackticks = fields.map((field) => `\`${field}\``).join(",");

    const query = `INSERT INTO ${tableName} (${fieldsWithBackticks}) VALUES (${placeholders})`;

    return { query, values };
  };

  generateSQLInsertOrUpdateQuery = (tableName, jsonObj) => {
    const fields = Object.keys(jsonObj);
    const values = Object.values(jsonObj).map((value) =>
      typeof value === "string" &&
      /^(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z)$/gm.test(value)
        ? this.formatDate(new Date(value))
        : value
    );

    const placeholders = fields.map(() => "?").join(",");
    const fieldsWithBackticks = fields.map((field) => `\`${field}\``).join(",");
    const updateStatement = fields
      .map((field) => `\`${field}\` = VALUES(\`${field}\`)`)
      .join(", ");

    const query = `INSERT INTO ${tableName} (${fieldsWithBackticks}) VALUES (${placeholders}) ON DUPLICATE KEY UPDATE ${updateStatement}`;

    return { query, values };
  };

  formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hour = String(date.getHours()).padStart(2, "0");
    const minute = String(date.getMinutes()).padStart(2, "0");
    const second = String(date.getSeconds()).padStart(2, "0");

    return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
  };

  runQuery = async (query, params) => {
    const conn = await this.#pool.getConnection();
    const result = await conn.query(query, params);

    conn.end();

    return result;
  };
}
