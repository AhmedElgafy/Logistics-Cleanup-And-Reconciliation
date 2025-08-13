import { Courier, CleanOrder } from "./types/types";

export function formatDate(date: Date): string {
  return date.toISOString().slice(0, 16).replace("T", " ");
}
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