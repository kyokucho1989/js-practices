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
      console.log(err.message);
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
      console.log(err.message);
    }
  } catch (err) {
    console.log(err.message);
  } finally {
    run(db, "DROP TABLE books");
    console.log("テーブル削除");
    db.close();
  }
}

promiseOk();
await timers.setTimeout(1000);
promiseError();
