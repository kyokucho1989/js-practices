#!/usr/bin/env node

import sqlite3 from "sqlite3";
import timers from "timers/promises";
import { run } from "./sqlite-function.js";
import { get } from "./sqlite-function.js";

const db = new sqlite3.Database(":memory:");

// エラーなし
run(db, "CREATE TABLE books (title TEXT NOT NULL)")
  .then(() =>
    run(db, "INSERT INTO books (title) VALUES (?) ", ["本のタイトル"])
  )
  .then(function (insertedBook) {
    console.log(`挿入された行のID: ${insertedBook.lastID}`);
    return get(db, "SELECT * FROM books WHERE rowid = ?", [
      insertedBook.lastID
    ]);
  })
  .then(function (selectedBook) {
    console.log(selectedBook);
  })
  .then(() => run(db, "DROP TABLE books"))
  .then(() => console.log("テーブル削除完了"));

await timers.setTimeout(1000);

// エラーあり
run(db, "CREATE TABLE books (title TEXT NOT NULL)")
  .then(() => run(db, "INSERT INTO books (title) VALUES (?) ", null))
  .catch(function (err) {
    console.error("エラーが発生しました:", err.message);
    return get(db, "SELECT * FROM bookss WHERE rowid = ?", [1]);
  })
  .then(function (insertedBook) {
    console.log(`挿入された行のID: ${insertedBook.lastID}`);
    return get(db, "SELECT * FROM books WHERE rowid = ?", [
      insertedBook.lastID
    ]);
  })
  .catch(function (err) {
    console.error("エラーが発生しました:", err.message);
  })
  .then(() => run(db, "DROP TABLE books"))
  .then(() => console.log("テーブル削除完了"))
  .then(() => db.close());
