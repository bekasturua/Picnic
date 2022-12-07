import * as dotenv from "dotenv";
dotenv.config();
import { createClient } from "@supabase/supabase-js";
import csv from "csv-parser";
import fs from "fs";
import { sendData } from "./dbUtils.js";

export const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

const results = [];

fs.createReadStream("WhatsgoodlyData-10.csv")
  .pipe(csv())
  .on("data", (data) => results.push(data))
  .on("end", async () => {
    await sendData(results);
  });
