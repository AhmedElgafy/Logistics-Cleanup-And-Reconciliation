import { formatDate, isCourierQualified } from "./shared/functions";
import {
  AssignmentResponse,
  CleanOrder,
  Courier,
  MappedPlanedOrders,
} from "./types/types";

const createAssignmentResponse = (
  cleanOrders: CleanOrder[],
  couriersCopy: Courier[]
): [AssignmentResponse, MappedPlanedOrders] => {
  const mappedPlanedOrders: MappedPlanedOrders = {};
  const assignmentResponse: AssignmentResponse = {
    assignments: [],
    unassigned: [],
    capacityUsage: [],
  };
  const mappedCouriersCopy: { [key: string]: Courier } = structuredClone(
    couriersCopy
  ).reduce((obj, courier) => {
    return { [courier.courierId]: courier, ...obj };
  }, {});

  cleanOrders.forEach((order) => {
    let isAssign = false;
    for (let courier of couriersCopy) {
      mappedPlanedOrders[order.orderId] = {
        idNew: order.orderId,
        isInLogs: false,
        time: formatDate(order.deadline),
        courier: "",
        weight: order.weight,
      };
      if (courier.dailyCapacity && !isAssign) {
        if (isCourierQualified(courier, order)) {
          courier.dailyCapacity -= order.weight;
          assignmentResponse.assignments.push({
            orderId: order.orderId,
            courierId: courier.courierId,
          });
          isAssign = true;
          mappedPlanedOrders[order.orderId].courier = courier.courierId;
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
      totalWeight:
        mappedCouriersCopy[courier.courierId].dailyCapacity -
        courier.dailyCapacity,
    });
  });
  return [assignmentResponse, mappedPlanedOrders];
};
export default createAssignmentResponse;
