import fs from "fs";
import csvParser from "csv-parser";
import { Log } from "./types/types";
import FilePath from "./shared/statics";
import { ParseError } from "./shared/errors";
import { normalizeOrderId } from "./shared/functions";

const getLogs = () => {
  return new Promise<Log[]>((res, rej) => {
    const logs: Log[] = [];
    fs.createReadStream(`${FilePath}/log.csv`)
      .on("error", () => {
        rej(new ParseError("log.csv"));
        // throw new ParseError("log.csv");
      })
      .pipe(csvParser())
      .on("data", (row: Log) => {
        logs.push({
          ...row,
          orderId: normalizeOrderId(row.orderId),
          deliveredAt: row.deliveredAt,
        });
      })
      .on("close", () => {
        res(logs);
      });
  });
};
export default getLogs;
