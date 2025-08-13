import fs from "fs";
import csvParser from "csv-parser";
import { Zones } from "./types/types";
import FilePath from "./statics";

const getZones = () =>
  new Promise<Zones>((res, rej) => {
    const zones: Zones = {};
    fs.createReadStream(`${FilePath}/zones.csv`)
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
