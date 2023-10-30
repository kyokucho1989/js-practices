#!/usr/bin/env node

import sqlite3 from "sqlite3";
import timers from "timers/promises";
import { run, get } from "./sqlite-function.js";

const db = new sqlite3.Database(":memory:");

// エラーなし
await run(db, "CREATE TABLE books (title TEXT NOT NULL)");
let insertedBook = await run(db, "INSERT INTO books (title) VALUES (?)", [
  "本のタイトル",
]);
console.log(`挿入された行のID: ${insertedBook.lastID}`);
let selectedBook = await get(db, "SELECT * FROM books WHERE rowid = ?", [
  insertedBook.lastID,
]);
console.log(selectedBook);
await run(db, "DROP TABLE books");
console.log("テーブル削除完了");

await timers.setTimeout(1000);

// エラーあり
try {
  await run(db, "CREATE TABLE books (title TEXT NOT NULL)");
  insertedBook = await run(db, "INSERT INTO books (title) VALUES (?)", null);
} catch (err) {
  if (err instanceof Error) {
    console.error(err.message);
  } else {
    throw err;
  }
}
try {
  selectedBook = await get(db, "SELECT * FROM bookss WHERE rowid = ?", [1]);
  console.log(insertedBook);
} catch (err) {
  if (err instanceof Error) {
    console.error(err.message);
  } else {
    throw err;
  }
} finally {
  await run(db, "DROP TABLE books");
  console.log("テーブル削除完了");
  db.close();
}
