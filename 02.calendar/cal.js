#!/usr/bin/env node

import minimist from "minimist";
import dayjs from "dayjs";

const argv = minimist(process.argv);
const now = dayjs();
const month = argv.m ?? now.month() + 1;
const year = argv.y ?? now.year();
const monthBeginningDayOfWeek = dayjs(new Date(year, month - 1, 1)).day();
const monthEndDate = dayjs(new Date(year, month, 0)).date();

console.log(`      ${month}月  ${year}`);
console.log("日 月 火 水 木 金 土");
process.stdout.write("   ".repeat(monthBeginningDayOfWeek));
for (let date = 1; date <= monthEndDate; date++) {
  process.stdout.write(date.toString().padStart(2, " ") + " ");
  if ((date + monthBeginningDayOfWeek) % 7 === 0) {
    console.log();
  }
}
if (monthBeginningDayOfWeek !== 5) {
  console.log();
}
