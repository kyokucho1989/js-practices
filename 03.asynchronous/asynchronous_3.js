#!/usr/bin/env node

import sqlite3 from "sqlite3";
import timers from "timers/promises";
const db = new sqlite3.Database(":memory:");

function createDatabase() {
  return new Promise(function (onFulfilled, onRejected) {
    db.run("CREATE TABLE lorem2 (title TEXT NOT NULL)", [], function (err) {
      if (err) {
        return onRejected(new Error("dbエラー"));
      } else {
        onFulfilled("テーブル作成完了");
      }
    });
  });
}

function insertItem(itemName = null) {
  return new Promise(function (onFulfilled, onRejected) {
    db.run(
      `INSERT INTO lorem2 (title) VALUES (?) `,
      [itemName],
      function (err) {
        if (err) {
          return onRejected(new Error(err));
        } else {
          onFulfilled(this.lastID);
        }
      }
    );
  });
}

function selectItem(id) {
  return new Promise(function (onFulfilled, onRejected) {
    db.get(`SELECT * FROM lorem2 WHERE rowid = ?`, [id], function (err, rows) {
      if (err) {
        return onRejected(new Error(err));
      } else if (rows === undefined) {
        return onRejected(new Error("レコードが見つかりません"));
      } else {
        onFulfilled(rows);
      }
    });
  });
}

function dropTable() {
  return new Promise(function (onFulfilled, onRejected) {
    db.run("DROP TABLE lorem2", [], function (err) {
      if (err) {
        return onRejected(new Error(err));
      } else {
        onFulfilled("テーブル削除完了");
      }
    });
  });
}

// エラーなし

async function f1() {
  let item_id;
  try {
    console.log(await createDatabase());
    item_id = await insertItem("item");
    console.log(item_id);
    console.log(await selectItem(item_id));
    console.log(await dropTable());
  } catch (err) {
    console.log(err);
  }
}

f1();

await timers.setTimeout(1000);

// エラーあり
async function f2() {
  let item_id;
  try {
    console.log(await createDatabase());
  } catch (err) {
    console.log(err);
  }

  try {
    item_id = await insertItem();
    console.log(item_id);
  } catch (err) {
    console.log(err.message);
  }

  try {
    console.log(await selectItem(item_id));
    console.log(await dropTable());
  } catch (err) {
    console.log(err.message);
  }
}

f2();

//   createDatabase()
//   .then(function (msg) {
//     console.log(msg);
//     return insertItem("本のタイトル");
//   })
//   .then(
//     function (id) {
//       console.log("挿入された行のID:", id);
//       return selectItem(id);
//     },
//     function (err) {
//       console.log(err.message);
//       return selectItem(1);
//     }
//   )
//   .then(
//     function (msg) {
//       console.log(msg);
//     },
//     function (err) {
//       console.log(err.message);
//     }
//   )
//   .then(function () {
//     dropTable();
//   })
//   .then(function () {
//     console.log("テーブル削除完了");
//   });
