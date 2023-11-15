import sqlite3 from "sqlite3";

const DB_FILE_NAME = "data";
const db = new sqlite3.Database(DB_FILE_NAME);

class DatabaseManager {
  all(sql, params = []) {
    return new Promise((resolve, reject) => {
      db.all(sql, params, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  get(sql, params = []) {
    return new Promise((resolve, reject) => {
      db.get(sql, params, (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  }

  run(sql, params = []) {
    return new Promise((resolve, reject) => {
      db.run(sql, params, function (err) {
        if (err) {
          reject(err);
        } else {
          resolve(this);
        }
      });
    });
  }
}

export default DatabaseManager;
