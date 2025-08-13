import fs from "fs";
import FilePath from "./statics";
import { Courier } from "./types/types";

const getCourier = () =>
  new Promise<Courier[]>((res, rej) => {
    fs.readFile(
      `${FilePath}/couriers.json`,
      "utf8",
      (err, jsonString: string) => {
        const courier: Courier[] = JSON.parse(jsonString);
        res(courier.sort((a, b) => a.priority - b.priority));
      }
    );
  });
export default getCourier;
