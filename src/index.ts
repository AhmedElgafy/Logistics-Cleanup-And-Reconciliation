import fs from "fs";
import {
  AssignmentResponse,
  CleanOrder,
  Courier,
  MappedIds,
  Order,
  Reconciliation,
  Zones,
} from "./types/types";
import getCourier from "./couriers";
import getCleanOrders from "./orders";
import getZones from "./zones";
import FilePath from "./statics";
import createAssignmentResponse from "./assignmentResponse";
import getLogs from "./logs";
import createReconciliation from "./reconciliation";

const run = async () => {
  try {
    const zones: Zones = await getZones();
    const [cleanOrders, mappedIds]: [CleanOrder[], MappedIds] =
      await getCleanOrders(zones);
    fs.writeFileSync(
      `${FilePath}/clean_orders.json`,
      JSON.stringify(cleanOrders)
    );
    const couriers: Courier[] = await getCourier();
    const [assignmentResponse, mappedPlanedOrders] = createAssignmentResponse(
      cleanOrders,
      [...couriers],
      mappedIds
    );
    fs.writeFileSync(
      `${FilePath}/plan.json`,
      JSON.stringify(assignmentResponse)
    );
    const logs = await getLogs();
    const reconciliation: Reconciliation = createReconciliation(
      logs,
      mappedPlanedOrders
    );

    console.log("logs", reconciliation);
  } catch (e) {
    console.log(e);
  }
};
run();
