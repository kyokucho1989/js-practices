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

// function insertItem(itemName = null) {
//   return new Promise(function (onFulfilled, onRejected) {
//     db.run(
//       `INSERT INTO lorem2 (title) VALUES (?) `,
//       [itemName],
//       function (err) {
//         if (err) {
//           return onRejected(new Error(err));
//         } else {
//           onFulfilled(this.lastID);
//         }
//       }
//     );
//   });
// }

// function selectItem(id) {
//   return new Promise(function (onFulfilled, onRejected) {
//     db.get(`SELECT * FROM lorem2 WHERE rowid = ?`, [id], function (err, rows) {
//       if (err) {
//         return onRejected(new Error(err));
//       } else if (rows === undefined) {
//         return onRejected(new Error("レコードが見つかりません"));
//       } else {
//         onFulfilled(rows);
//       }
//     });
//   });
// }

// function dropTable() {
//   return new Promise(function (onFulfilled, onRejected) {
//     db.run("DROP TABLE lorem2", [], function (err) {
//       if (err) {
//         return onRejected(new Error(err));
//       } else {
//         onFulfilled("テーブル削除完了");
//       }
//     });
//   });
// }

// エラーなし

async function f1(){
  try {
    await createDatabase()
  } catch{
    console.log("a");
  }
}

f1();
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



// await timers.setTimeout(1000);
