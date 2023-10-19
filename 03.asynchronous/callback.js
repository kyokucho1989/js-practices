#!/usr/bin/env node

import sqlite3 from "sqlite3";
import timers from "timers/promises";

const db = new sqlite3.Database(":memory:");

// コールバック エラーなし
db.run("CREATE TABLE books (title TEXT NOT NULL)", () => {
  db.run("INSERT INTO books (title) VALUES ('本のタイトル') ", function () {
    console.log("挿入された行のID:" + this.lastID);
    db.get(`SELECT * FROM books WHERE rowid = ?`, this.lastID, (_err, book) => {
      console.log(book);
      db.run("DROP TABLE books", () => {
        console.log("テーブル削除完了");
      });
    });
  });
});

await timers.setTimeout(1000);

// コールバック エラーあり
db.run("CREATE TABLE books (title TEXT NOT NULL)", () => {
  db.run("INSERT INTO books (title) VALUES (null) ", function (err) {
    if (err) {
      console.error(err.message);
    } else {
      console.log("挿入された行のID:" + this.lastID);
    }
    db.get(`SELECT * FROM bookss WHERE rowid = ?`, this.lastID, (err, book) => {
      if (err) {
        console.error(err.message);
      } else {
        console.log(book);
      }
      db.run("DROP TABLE books", () => {
        console.log("テーブル削除完了");
        db.close();
      });
    });
  });
});
