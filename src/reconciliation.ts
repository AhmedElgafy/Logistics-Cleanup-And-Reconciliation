import { Log, MappedPlanedOrders, Reconciliation } from "./types/types";

const createReconciliation = (
  logs: Log[],
  mappedPlanedOrders: MappedPlanedOrders
) => {
  const reconciliation: Reconciliation = {
    missing: [],
    unexpected: [],
    duplicate: [],
    late: [],
    misassigned: [],
    overloadedCouriers: [],
  };
  logs.forEach((log) => {
    let isInPlan = false;
    const planedOrder = mappedPlanedOrders[log.orderId];
    const isDuplicated = planedOrder?.isInLogs;
    if (planedOrder) {
      isInPlan = true;
      if (isDuplicated) {
        reconciliation.duplicate.push(log.orderId);
      } else {
        planedOrder.isInLogs = true;
        if (!planedOrder.isInLogs) {
          reconciliation.unexpected.push(log.orderId);
        } else {
          if (planedOrder.time < log.deliveredAt) {
            reconciliation.late.push(log.orderId);
          }
        }
      }
    } else {
      reconciliation.missing.push(log.orderId);
    }
  });
  return reconciliation;
};
export default createReconciliation;
