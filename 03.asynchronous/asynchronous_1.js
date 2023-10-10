#!/usr/bin/env node

import sqlite3 from "sqlite3";
const db = new sqlite3.Database(":memory:");
const db2 = new sqlite3.Database(":memory:");

// コールバック
db.run("CREATE TABLE lorem (title TEXT)", [], () => {
  db.run("INSERT INTO lorem (title) VALUES ('本のタイトル') ", [], function () {
    console.log("挿入された行のID:", this.lastID);
    db.all("SELECT rowid AS id, title FROM lorem", function (err, rows) {
      rows.forEach((row) => {
        console.log("ID:", row.id);
        console.log("Title:", row.title);
      });
    });
  });
});

db.close(f2);

// コールバック エラーあり
function f2() {
  db2.run("CREATE TABLE lorem2 (title TEXT)", [], () => {
    db2.run(
      "INSERT INTO lorem2 (title2) VALUES ('本のタイトル2') ",
      [],
      function (err) {
        if (err) {
          console.error(err.message);
        } else {
          console.log("挿入された行のID:", this.lastID);
        }
        db2.all("SELECT rowid AS id, titl FROM lorem2", function (err, rows) {
          if (err) {
            console.error(err.message);
          } else {
            rows.forEach((row) => {
              console.log("ID:", row.id);
              console.log("Title:", row.title);
            });
          }
        });
      }
    );
  });
  db2.close();
}
