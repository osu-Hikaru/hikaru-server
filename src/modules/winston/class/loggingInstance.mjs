// Licensed under GPL v3 - Check Repository Root for full License notice.
// osu!Hikaru, a fully independent osu!Lazer Private Server backend.
// Copyright (C) 2023 Hikaru Team <copyright@hikaru.pw>

import winston from "winston";

export default class {
  #instance;

  constructor() {
    this.#instance = winston.createLogger({
      levels: {
        emerg: 0,
        alert: 1,
        crit: 2,
        morgan: 3,
        error: 3,
        warn: 4,
        notice: 5,
        info: 6,
        debug: 7,
      },
      format: winston.format.json(),
      defaultMeta: { service: "user-service" },
      transports: [
        new winston.transports.Console({
          format: winston.format.simple(),
          level: "info",
        }),
        new winston.transports.File({
          filename: "./src/logs/error.log",
          level: "error",
        }),
        new winston.transports.File({
          filename: "./src/logs/combined.log",
          level: "debug",
        }),
      ],
    });

    this.notice("logger", "Hello World!");
  }

  /**
   * @description Writes an error message with severity "FATAL" and exists the process.
   * @param {string} worker
   * @param {string} message
   */
  emerg = async (worker, message) => {
    this.#instance.emerg("[" + worker.toUpperCase() + "] " + message);
    process.exit(-1);
  };

  /**
   * @description Writes an error message with severity "ALERT" .
   * @param {string} worker
   * @param {string} message
   */
  alert = async (worker, message) => {
    this.#instance.alert("[" + worker.toUpperCase() + "] " + message);
  };

  /**
   * @description Writes an error message with severity "CRITICAL" .
   * @param {string} worker
   * @param {string} message
   */
  crit = async (worker, message) => {
    this.#instance.crit("[" + worker.toUpperCase() + "] " + message);
  };

  /**
   * @description Writes an error message with severity "ERROR" .
   * @param {string} worker
   * @param {string} message
   */
  error = async (worker, message) => {
    this.#instance.error("[" + worker.toUpperCase() + "] " + message);
  };

  /**
   * @description Writes an error message with severity "WARNING" .
   * @param {string} worker
   * @param {string} message
   */
  warn = async (worker, message) => {
    this.#instance.warn("[" + worker.toUpperCase() + "] " + message);
  };

  /**
   * @description Writes an error message with severity "NOTICE" .
   * @param {string} worker
   * @param {string} message
   */
  notice = async (worker, message) => {
    this.#instance.notice("[" + worker.toUpperCase() + "] " + message);
  };

  /**
   * @description Writes an error message with severity "INFORMATION" .
   * @param {string} worker
   * @param {string} message
   */
  info = async (worker, message) => {
    this.#instance.info("[" + worker.toUpperCase() + "] " + message);
  };

  /**
   * @description Writes an error message with severity "DEBUG" .
   * @param {string} worker
   * @param {string} message
   */
  debug = async (worker, message) => {
    this.#instance.debug("[" + worker.toUpperCase() + "] " + message);
  };
}
