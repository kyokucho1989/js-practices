#!/usr/bin/env node

import sqlite3 from "sqlite3";
import timers from "timers/promises";

const db = new sqlite3.Database(":memory:");

// コールバック エラーなし
db.run("CREATE TABLE lorem (title TEXT NOT NULL)", [], () => {
  db.run("INSERT INTO lorem (title) VALUES ('本のタイトル') ", [], function () {
    console.log("挿入された行のID:", this.lastID);
    let id = this.lastID;
    db.get(`SELECT * FROM lorem WHERE rowid = ?`, [id], function (err, rows) {
      console.log(rows);
      db.run("DROP TABLE lorem", [], function () {
        console.log("テーブル削除完了");
      });
    });
  });
});

await timers.setTimeout(1000);

// コールバック エラーあり
db.run("CREATE TABLE lorem2 (title TEXT NOT NULL)", [], () => {
  db.run(
    "INSERT INTO lorem2 (title2) VALUES ('本のタイトル2') ",
    [],
    function (err) {
      let id;
      if (err) {
        console.error(err.message);
      } else {
        console.log("挿入された行のID:", this.lastID);
        id = this.lastID;
      }
      db.get(
        `SELECT * FROM lorem2 WHERE rowid = ?`,
        [id],
        function (err, rows) {
          if (err) {
            console.error(err.message);
          } else if (rows === undefined) {
            console.log("レコードが見つかりません");
          }
          db.run("DROP TABLE lorem2", [], function () {
            console.log("テーブル削除完了");
          });
        }
      );
    }
  );
  db.close();
});
