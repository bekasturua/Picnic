
import csv from "csv-parser";
import fs from "fs";
import { sendData } from "./dbUtils.js";



const results = [];

fs.createReadStream("WhatsgoodlyData-10.csv")
  .pipe(csv())
  .on("data", (data) => results.push(data))
  .on("end", async () => {
    await sendData(results);
  });
