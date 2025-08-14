import fs from "fs";
import FilePath, { DirName } from "./statics";
import { Courier, CleanOrder } from "../types/types";

// export function formatDateString(date: Date): string {
//   return date.toISOString().slice(0, 16).replace("T", " ");
// }
export const isCourierQualified = (
  courier: Courier,
  order: CleanOrder
): boolean => {
  if (
    courier.zonesCovered.includes(order.city) &&
    courier.acceptsCOD == (order.paymentType == "COD") &&
    !courier.exclusions.includes(order.productType) &&
    courier.dailyCapacity >= order.weight
  ) {
    return true;
  }
  return false;
};
export const createFile = <T>(name: string, data: T) => {
  fs.writeFileSync(`${FilePath}/${DirName}/${name}.json`, JSON.stringify(data));
};
export const makeResultDir = () => {
  try {
    fs.mkdirSync(`${FilePath}/${DirName}`);
  } catch (e) {
    const error = e as Error;

    if (!error.message.includes("EEXIST")) {
      console.log("sorry can not create result directory");
    }
  }
};
export function normalizeOrderId(id: string): string {
  return id
    .trim()
    .toUpperCase()
    .replace(/^[^A-Z0-9]+|[^A-Z0-9]+$/g, "");
}
export function formatDate(date: string):string {
  const formattedDate = date.replace(" ", "T") + ":00.000Z";
  return date
}
