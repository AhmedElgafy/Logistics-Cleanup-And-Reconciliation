import fs from "fs";
import csvParser from "csv-parser";
import { Log } from "./types/types";
import FilePath from "./statics";

const getLogs = () =>
  new Promise<Log[]>((res, rej) => {
    const logs: Log[] = [];
    fs.createReadStream(`${FilePath}/log.csv`)
      .pipe(csvParser())
      .on("data", (row: Log) => {
        // console.log(row);
        logs.push({ ...row, deliveredAt: new Date(row.deliveredAt) });
      }).on("close",()=>{
          res(logs);
      });
  });
export default getLogs;
