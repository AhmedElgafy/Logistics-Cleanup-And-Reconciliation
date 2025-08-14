import {
  AssignmentResponse,
  CleanOrder,
  Courier,
  Reconciliation,
  Zones,
} from "./types/types";
import getCourier from "./couriers";
import getCleanOrders from "./orders";
import getZones from "./zones";
import createAssignmentResponse from "./assignmentResponse";
import getLogs from "./logs";
import createReconciliation from "./reconciliation";
import { createFile, makeResultDir } from "./shared/functions";
import { ParseError } from "./shared/errors";
import FilePath, { DirName } from "./shared/statics";

const run = async () => {
  try {
    makeResultDir();
    const zones: Zones = await getZones();
    const cleanOrders: CleanOrder[] = await getCleanOrders(zones);
    createFile<CleanOrder[]>("clean_orders", cleanOrders);
    const couriers: Courier[] = await getCourier();
    const [assignmentResponse, mappedPlanedOrders] = createAssignmentResponse(
      cleanOrders,
      structuredClone(couriers)
    );
    createFile<AssignmentResponse>("plan", assignmentResponse);
    const logs = await getLogs();
    const reconciliation: Reconciliation = createReconciliation(
      logs,
      mappedPlanedOrders,
      structuredClone(couriers)
    );
    createFile<Reconciliation>("reconciliation", reconciliation);
    console.log(
      "-------------------- task completed successfully ---------------------"
    );
    console.log(`please check ${__dirname}${FilePath}/${DirName}`);
  } catch (e) {
    if (e instanceof ParseError) {
      const errors: { message: string } = {
        message: e.message,
      };
      createFile<{ message: string }>("warnings", errors);
      console.log(e.message);
    } else {
      console.log(e);
    }
  }
};
run();
