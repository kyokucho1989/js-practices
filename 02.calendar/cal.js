#!/usr/bin/env node

import minimist from 'minimist';
import dayjs from "dayjs";

let argv = minimist(process.argv);
const month = argv['m'] === undefined ? dayjs().month() + 1 : argv['m'];
const year = argv['y'] === undefined ? dayjs().year() : argv['y'];

const monthIndex = month - 1;
let days_to_shift = dayjs(new Date(year,monthIndex,1)).day();
let day_end = dayjs(new Date(year,monthIndex + 1,0)).date();

console.log(`      ${month}月  ${year}`);
console.log(`日 月 火 水 木 金 土`);
process.stdout.write("   ".repeat(days_to_shift));
for (let day = 1; day <= day_end ; day++ ){
  process.stdout.write(day.toString().padStart(2, ' ') + " ");
  if( (day + days_to_shift) % 7 == 0){
    console.log("");
  }
}
console.log("");
