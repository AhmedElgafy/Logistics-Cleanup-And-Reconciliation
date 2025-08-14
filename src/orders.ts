import fs from "fs";
import { normalizeOrderId } from "./shared/functions";
import FilePath from "./shared/statics";
import { CleanOrder, Order } from "./types/types";
import { ParseError } from "./shared/errors";

const getCleanOrders = (zones: { [key: string]: string }) =>
  new Promise<CleanOrder[]>((res, rej) => {
    fs.readFile(
      `${FilePath}/orders.json`,
      "utf8",
      (err, jsonString: string) => {
        try {
          const cleanOrders: CleanOrder[] = [];
          const orders: Order[] = JSON.parse(jsonString);
          for (let i = 0; i < orders.length; i++) {
            const order: Order = orders[i];
            const cleanOrder: CleanOrder = {
              orderId: normalizeOrderId(order.orderId),
              city: zones[order.city],
              zoneHint: order.zoneHint,
              address: order.address,
              paymentType:
                order.paymentType.toLowerCase() == "cod" ? "COD" : "Prepaid",
              productType:
                order.productType.toLowerCase() == "standard"
                  ? "standard"
                  : "fragile",
              weight: +order.weight,
              deadline: order.deadline,
            };
            cleanOrders.push(cleanOrder);
          }
          res(cleanOrders);
        } catch (e) {
          rej(new ParseError("orders.json"));
        }
      }
    );
  });
export default getCleanOrders;
