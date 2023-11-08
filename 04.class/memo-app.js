#!/usr/bin/env node

import Memo from "./memo-class.js";
import DatabaseManager from "./database-class.js";
import minimist from "minimist";

const argv = minimist(process.argv);
const dataBase = await new DatabaseManager();

await dataBase.databaseSet();
if (argv.r) {
  dataBase.displayDetail();
}

if (argv.d) {
  dataBase.deleteItem();
}

if (argv.y) {
  dataBase.displayAll();
}

if (!process.stdin.isTTY) {
  process.stdin.setEncoding("utf8");
  let insertMemo = "";
  process.stdin.on("data", (data) => {
    insertMemo += data;
    process.stdin.end();
  });
  process.stdin.on("end", () => {
    insertMemo = insertMemo.slice(0, -1);
    const memo = new Memo(insertMemo);
    dataBase.saveItem(memo);
    console.log("追加しました");
  });
}
