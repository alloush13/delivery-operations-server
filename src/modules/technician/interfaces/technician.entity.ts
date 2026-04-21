export interface Technician {
  id: string;

  name: string;

  phone: string;

  skills: string[];

  status: "active" | "inactive";

  availability: "online" | "offline";

  currentLocation: {
    lat: number | null;
    lng: number | null;
    updatedAt: Date | null;
  };

  createdAt: Date;

  updatedAt: Date;
}