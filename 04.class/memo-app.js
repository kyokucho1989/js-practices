#!/usr/bin/env node

import Memo from "./memo-class.js";
import DatabaseManager from "./database-class.js";
import CommandHandler from "./command-class.js";
import minimist from "minimist";
import MemoRepository from "./memo-repository-class.js";

const argv = minimist(process.argv);
const dataBase = new DatabaseManager();
const memoRepository = new MemoRepository(dataBase);
const command = new CommandHandler(memoRepository);

if (argv.r) {
  command.displayDetail();
}

if (argv.d) {
  command.deleteItem();
}

if (argv.l) {
  command.displayAll();
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
    command.saveItem(memo);
    console.log("追加しました");
  });
}
