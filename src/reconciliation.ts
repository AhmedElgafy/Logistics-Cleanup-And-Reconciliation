import { formatDate } from "./shared/functions";
import {
  Courier,
  Log,
  MappedPlanedOrders,
  Reconciliation,
} from "./types/types";

const createReconciliation = (
  logs: Log[],
  mappedPlanedOrders: MappedPlanedOrders,
  couriers: Courier[]
) => {
  const reconciliation: Reconciliation = {
    missing: [],
    unexpected: [],
    duplicate: [],
    late: [],
    misassigned: [],
    overloadedCouriers: [],
  };
  const mappedLog: { [kye: string]: Log } = logs.reduce((obj, log) => {
    return { [log.orderId]: log, ...obj };
  }, {});
  Object.keys(mappedPlanedOrders).map((key) => {
    if (!mappedLog[key]) {
      reconciliation.missing.push(key);
    }
  });
  logs.forEach((log) => {
    const planedOrder = mappedPlanedOrders[log.orderId.toUpperCase()];
    const isDuplicated = planedOrder?.isInLogs;
    
    if (planedOrder) {
      if (isDuplicated) {
        reconciliation.duplicate.push(log.orderId);
      } else {
        planedOrder.isInLogs = true;
        if (formatDate(planedOrder.time) < formatDate(log.deliveredAt)) {
          reconciliation.late.push(log.orderId);
        }
        if (planedOrder.courier != log.courierId) {
          reconciliation.misassigned.push(log.orderId);
        }
        couriers.forEach((courier) => {
          if (courier.courierId == log.courierId) {
            courier.dailyCapacity -= planedOrder.weight;
          }
          if (courier.dailyCapacity < 0) {
            reconciliation.overloadedCouriers.push(courier.courierId);
          }
        });
      }
    } else {
      reconciliation.unexpected.push(log.orderId);
    }
  });

  return reconciliation;
};
export default createReconciliation;
