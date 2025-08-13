import  fs  from 'fs';
import { formatDate } from "./functions";
import FilePath from "./statics";
import { CleanOrder, MappedIds, Order } from "./types/types";

const getCleanOrders = (zones: { [key: string]: string }) =>
  new Promise<[CleanOrder[], MappedIds]>((res, rej) => {
    fs.readFile(`${FilePath}/orders.json`, "utf8", (err, jsonString: string) => {
      const mappedIds: MappedIds = {};
      const cleanOrders: CleanOrder[] = [];
      const orders: Order[] = JSON.parse(jsonString);
      for (let i = 0; i < orders.length; i++) {
        const idNew = `ORD-${String(i + 1).padStart(3, "0")}`;
        const order: Order = orders[i];
        mappedIds[idNew] = order.orderId;
        const cleanOrder: CleanOrder = {
          orderId: idNew,
          city: zones[order.city],
          zoneHint: order.zoneHint,
          address: order.address,
          paymentType:
            order.paymentType.toLowerCase() == "cod" ? "COD" : "Prepaid",
          productType:
            order.productType.toLowerCase() == "standard"
              ? "standard"
              : "fragile",
          weight: order.weight,
          deadline: formatDate(new Date(order.deadline)),
        };
        cleanOrders.push(cleanOrder);
      }
      res([cleanOrders, mappedIds]);
    });
  });
export default getCleanOrders