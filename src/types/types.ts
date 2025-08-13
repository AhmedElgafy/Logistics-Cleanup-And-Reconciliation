export interface Assignment {
  orderId: string;
  courierId: string;
}

export interface UnassignedOrder {
  orderId: string;
  reason: string; // could be a union type if you know all possible reasons
}

export interface CapacityUsage {
  courierId: string;
  totalWeight: number;
}

export interface AssignmentResponse {
  assignments: Assignment[];
  unassigned: UnassignedOrder[];
  capacityUsage: CapacityUsage[];
}
export interface CleanOrder {
  orderId: string;
  city: string;
  zoneHint: string;
  address: string;
  paymentType: "COD" | "Prepaid";
  productType: "standard" | "fragile";
  weight: number;
  deadline: string | Date;
}
export interface Order {
  orderId: string;
  city: string;
  zoneHint: string;
  address: string;
  paymentType: string;
  productType: string;
  weight: number;
  deadline: Date;
}
export interface MappedIds {
  [key: string]: string;
}
export interface Zones {
  [key: string]: string;
}
export interface Courier {
  courierId: string;
  zonesCovered: string[];
  acceptsCOD: boolean;
  exclusions: string[];
  dailyCapacity: number;
  priority: number;
}
export interface Reconciliation {
  missing: string[];
  unexpected: string[];
  duplicate: string[];
  late: string[];
  misassigned: string[];
  overloadedCouriers: string[];
}
export interface MappedPlanedOrders {
  [key: string]: {
    idNew: string;
    isInLogs: boolean;
    time: Date;
    courier: string;
  };
}
export interface Log {
  orderId: string;
  courierId: string;
  deliveredAt: Date;
}
