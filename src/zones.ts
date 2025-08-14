import fs from "fs";
import csvParser from "csv-parser";
import { Zones } from "./types/types";
import FilePath from "./shared/statics";
import { ParseError } from "./shared/errors";

const getZones = () =>
  new Promise<Zones>((res, rej) => {
    const zones: Zones = {};
    fs.createReadStream(`${FilePath}/zones.csv`)
      .on("error", () => {
        rej(new ParseError("zones.csv"));
      })
      .pipe(csvParser())
      .on("data", (row: { raw: string; canonical: string }) => {
        zones[row.raw] = row.canonical;
        zones[row.canonical] = row.canonical;
      })
      .on("close", () => {
        res(zones);
      });
  });
export default getZones;
