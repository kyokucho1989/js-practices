#!/usr/bin/env node

import minimist from "minimist";
import dayjs from "dayjs";

const argv = minimist(process.argv);
const now = dayjs();
const month = argv.m ?? now.month() + 1;
const year = argv.y ?? now.year();
const monthBeginningDay = dayjs(new Date(year, month - 1, 1));
const monthEndDay = dayjs(new Date(year, month, 0));

console.log(`      ${month}月  ${year}`);
console.log("日 月 火 水 木 金 土");
process.stdout.write("   ".repeat(monthBeginningDay.day()));
for (let date = monthBeginningDay ; date.date() !== monthEndDay.date(); date = date.add(1, 'day')){
  process.stdout.write(date.date().toString().padStart(2, " ") + " ");
  if (date.day() === 6) {
    console.log();
  }
}
