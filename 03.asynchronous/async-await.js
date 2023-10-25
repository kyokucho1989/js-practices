#!/usr/bin/env node

import sqlite3 from "sqlite3";
import timers from "timers/promises";
import { run } from "./sqlite-function.js";
import { get } from "./sqlite-function.js";

const db = new sqlite3.Database(":memory:");

// エラーなし

await run(db, "CREATE TABLE books (title TEXT NOT NULL)");
let insertedBook = await run(db, "INSERT INTO books (title) VALUES (?) ", [
  "本のタイトル"
]);
console.log(`挿入された行のID: ${insertedBook.lastID}`);
let selectedBook = await get(db, "SELECT * FROM books WHERE rowid = ?", [
  insertedBook.lastID
]);
console.log(selectedBook);
await run(db, "DROP TABLE books");
console.log("テーブル削除完了");

await timers.setTimeout(1000);

// エラーあり

try {
  await run(db, "CREATE TABLE books (title TEXT NOT NULL)");
  try {
    insertedBook = await run(db, "INSERT INTO books (title) VALUES (?) ", null);
    console.log(`挿入された行のID: ${insertedBook.lastID}`);
    selectedBook = await get(db, "SELECT * FROM books WHERE rowid = ?", [
      insertedBook.lastID
    ]);
  } catch (err) {
    console.error(err.message);
    selectedBook = await get(db, "SELECT * FROM bookss WHERE rowid = ?", [1]);
  }
  try {
    console.log(insertedBook);
    selectedBook = await get(db, "SELECT * FROM books WHERE rowid = ?", [
      insertedBook.lastID
    ]);
    console.log(selectedBook);
  } catch (err) {
    console.error(err.message);
  }
} catch (err) {
  console.error(err.message);
} finally {
  await run(db, "DROP TABLE books");
  console.log("テーブル削除完了");
  db.close();
}
