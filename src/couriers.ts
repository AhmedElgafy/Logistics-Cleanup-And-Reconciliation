import fs from "fs";
import FilePath from "./shared/statics";
import { Courier } from "./types/types";
import { ParseError } from "./shared/errors";

const getCourier = () =>
  new Promise<Courier[]>((res, rej) => {
    fs.readFile(
      `${FilePath}/couriers.json`,
      "utf8",
      (err, jsonString: string) => {
        try {
          if (err) {
            throw new Error();
          }
          const courier: Courier[] = JSON.parse(jsonString);
          res(courier.sort((a, b) => a.priority - b.priority));
        } catch {
          rej(new ParseError("couriers.json"));
        }
      }
    );
  });
export default getCourier;
