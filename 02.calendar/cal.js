#!/usr/bin/env node

import minimist from "minimist";
import dayjs from "dayjs";

const argv = minimist(process.argv);
const month = argv["m"] === undefined ? dayjs().month() + 1 : argv["m"];
const year = argv["y"] === undefined ? dayjs().year() : argv["y"];

const monthIndex = month - 1;
const weekdayShift = dayjs(new Date(year, monthIndex, 1)).day();
const monthEndDate = dayjs(new Date(year, monthIndex + 1, 0)).date();

console.log(`      ${month}月  ${year}`);
console.log(`日 月 火 水 木 金 土`);
process.stdout.write("   ".repeat(weekdayShift));
for (let day = 1; day <= monthEndDate; day++) {
  process.stdout.write(day.toString().padStart(2, " ") + " ");
  if ((day + weekdayShift) % 7 == 0) {
    console.log();
  }
}
if (weekdayShift !== 5 ) console.log();
