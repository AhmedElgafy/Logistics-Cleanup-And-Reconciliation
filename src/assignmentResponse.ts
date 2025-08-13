import { isCourierQualified } from "./functions";
import {
  AssignmentResponse,
  CleanOrder,
  Courier,
  MappedIds,
  MappedPlanedOrders,
} from "./types/types";

const createAssignmentResponse = (
  cleanOrders: CleanOrder[],
  couriersCopy: Courier[],
  mappedIds: MappedIds
): [AssignmentResponse, MappedPlanedOrders] => {
  const mappedPlanedOrders: MappedPlanedOrders = {};
  const assignmentResponse: AssignmentResponse = {
    assignments: [],
    unassigned: [],
    capacityUsage: [],
  };
  cleanOrders.forEach((order) => {
    let isAssign = false;
    for (let courier of couriersCopy) {
      mappedPlanedOrders[mappedIds[order.orderId]] = {
        idNew: order.orderId,
        isInLogs: false,
        time: new Date(order.deadline),
        courier: "",
      };
      if (courier.dailyCapacity) {
        if (isCourierQualified(courier, order)) {
          courier.dailyCapacity -= order.weight;
          assignmentResponse.assignments.push({
            courierId: courier.courierId,
            orderId: order.orderId,
          });
          isAssign = true;
          mappedPlanedOrders[mappedIds[order.orderId]].courier =
            courier.courierId;
        }
      }
    }
    if (!isAssign)
      assignmentResponse.unassigned.push({
        orderId: order.orderId,
        reason: "no_supported_courier_or_capacity",
      });
  });
  couriersCopy.forEach((courier) => {
    assignmentResponse.capacityUsage.push({
      courierId: courier.courierId,
      totalWeight: courier.dailyCapacity,
    });
  });
  return [assignmentResponse, mappedPlanedOrders];
};
export default createAssignmentResponse;
