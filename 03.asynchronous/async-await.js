#!/usr/bin/env node

import sqlite3 from "sqlite3";
import timers from "timers/promises";
import { run } from "./sqlite-function.js";
import { get } from "./sqlite-function.js";

const db = new sqlite3.Database(":memory:");

async function promiseOk() {
  await run(db, "CREATE TABLE books (title TEXT NOT NULL)");
  const insertedResult = await run(
    db,
    "INSERT INTO books (title) VALUES (?) ",
    "本のタイトル"
  );
  console.log(`挿入された行のID: ${insertedResult.lastID}`);
  const selectedResult = await get(
    db,
    "SELECT * FROM books WHERE rowid = ?",
    insertedResult.lastID
  );
  console.log(selectedResult);
  run(db, "DROP TABLE books");
  console.log("テーブル削除完了");
}

async function promiseError() {
  let insertedResult, selectedResult;
  try {
    await run(db, "CREATE TABLE books (title TEXT NOT NULL)");
    try {
      insertedResult = await run(
        db,
        "INSERT INTO books (title) VALUES (?) ",
        null
      );
      console.log(`挿入された行のID: ${insertedResult.lastID}`);
      selectedResult = await get(
        db,
        "SELECT * FROM books WHERE rowid = ?",
        insertedResult.lastID
      );
    } catch (err) {
      console.error("エラーが発生しました:", err.message);
      selectedResult = await get(db, "SELECT * FROM bookss WHERE rowid = ?", 1);
    }
    try {
      console.log(insertedResult);
      selectedResult = await get(
        db,
        "SELECT * FROM books WHERE rowid = ?",
        insertedResult.lastID
      );
      console.log(selectedResult);
    } catch (err) {
      console.error("エラーが発生しました:", err.message);
    }
  } catch (err) {
    console.error("エラーが発生しました:", err.message);
  } finally {
    run(db, "DROP TABLE books");
    console.log("テーブル削除完了");
    db.close();
  }
}

promiseOk();
await timers.setTimeout(1000);
promiseError();
