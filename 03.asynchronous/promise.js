#!/usr/bin/env node

import sqlite3 from "sqlite3";
import timers from "timers/promises";

const db = new sqlite3.Database(":memory:");

function createDatabase() {
  return new Promise(function (resolve, reject) {
    db.run("CREATE TABLE books (title TEXT NOT NULL)", (err) => {
      if (err) {
        reject(err);
      } else {
        resolve("テーブル作成完了");
      }
    });
  });
}

function insertItem(itemName = null) {
  return new Promise(function (resolve, reject) {
    db.run("INSERT INTO books (title) VALUES (?) ", itemName, function (err) {
      if (err) {
        reject(err);
      } else {
        resolve(this.lastID);
      }
    });
  });
}

function selectItem(dbName, id) {
  return new Promise(function (resolve, reject) {
    db.get(`SELECT * FROM ${dbName} WHERE rowid = ?`, id, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

function dropTable() {
  return new Promise((resolve, reject) => {
    db.run("DROP TABLE books", (err) => {
      if (err) {
        reject(err);
      } else {
        resolve("テーブル削除完了");
      }
    });
  });
}

// エラーなし
createDatabase()
  .then(function (msg) {
    console.log(msg);
    return insertItem("本のタイトル");
  })
  .then(function (id) {
    console.log("挿入された行のID:", id);
    return selectItem("books", id);
  })
  .then(function (msg) {
    console.log(msg);
  })
  .then(function () {
    return dropTable();
  })
  .then(function (msg) {
    console.log(msg);
  });

await timers.setTimeout(1000);

// エラーあり
createDatabase()
  .then(function (msg) {
    console.log(msg);
    return insertItem();
  })
  .catch(function (err) {
    console.error("エラーが発生しました:", err.message);
  })
  .then(function (id) {
    console.log("挿入された行のID:", id);
    return selectItem("bookss", id);
  })
  .catch(function (err) {
    console.error("エラーが発生しました:", err.message);
  })
  .then(function (msg) {
    console.log(msg);
  })
  .then(function () {
    return dropTable();
  })
  .then(function (msg) {
    console.log(msg);
  });
