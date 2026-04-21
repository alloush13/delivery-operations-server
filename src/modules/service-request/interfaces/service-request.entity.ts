
export interface ServiceRequest {
  referenceNumber: string;
  customerName: string;
  customerPhone: string;
  area: string;
  fullAddress: string;
  location: {
    lat: number;
    lng: number;
  };
  category: string;
  priority?: "low" | "medium" | "high";
  status:
    | "new"
    | "assigned"
    | "on_the_way"
    | "in_progress"
    | "completed"
    | "cancelled";
  technicianId?: string | null;
  externalReference?: string | null;
}