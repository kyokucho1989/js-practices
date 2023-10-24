#!/usr/bin/env node

import sqlite3 from "sqlite3";
import timers from "timers/promises";

const db = new sqlite3.Database(":memory:");

function run(db, SQL, params = []) {
  return new Promise(function (resolve, reject) {
    db.run(SQL, params, function (err) {
      if (err) {
        reject(err);
      } else {
        resolve(this);
      }
    });
  });
}

function get(db, SQL, params = []) {
  return new Promise(function (resolve, reject) {
    db.get(SQL, params, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

// エラーなし
run(db, "CREATE TABLE books (title TEXT NOT NULL)")
  .then(function () {
    return run(db, "INSERT INTO books (title) VALUES (?) ", "本のタイトル");
  })
  .then(function (obj) {
    console.log(`挿入された行のID: ${obj.lastID}`);
    return get(db, "SELECT * FROM books WHERE rowid = ?", obj.lastID);
  })
  .then(function (msg) {
    console.log(msg);
  })
  .then(function () {
    run(db, "DROP TABLE books");
    return console.log("テーブル削除完了");
  });

await timers.setTimeout(1000);

// エラーあり
run(db, "CREATE TABLE books (title TEXT NOT NULL)")
  .then(function () {
    return run(db, "INSERT INTO books (title) VALUES (?) ", null);
  })
  .catch(function (err) {
    console.error("エラーが発生しました:", err.message);
    return get(db, "SELECT * FROM bookss WHERE rowid = ?", 1);
  })
  .then(function (obj) {
    console.log(`挿入された行のID: ${obj.lastID}`);
    return get(db, "SELECT * FROM books WHERE rowid = ?", obj.lastID);
  })
  .catch(function (err) {
    console.error("エラーが発生しました:", err.message);
  })
  .then(function () {
    run(db, "DROP TABLE books");
    return console.log("テーブル削除完了");
  })
  .then(function () {
    db.close();
  });
