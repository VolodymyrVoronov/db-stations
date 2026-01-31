// ---------- Core primitives ----------
type TimeRange = {
  fromTime: string; // "HH:mm"
  toTime: string; // "HH:mm"
};

type WeeklyAvailability = {
  monday: TimeRange;
  tuesday: TimeRange;
  wednesday: TimeRange;
  thursday: TimeRange;
  friday: TimeRange;
  saturday: TimeRange;
  sunday: TimeRange;
  holiday: TimeRange;
};

// ---------- Sub-objects ----------
type Location = {
  type: "location";
  latitude: number;
  longitude: number;
};

type Operator = {
  type: "operator";
  id: string;
  name: string;
};

type Address = {
  city: string;
  zipcode: string;
  street: string;
};

type Regionalbereich = {
  number: number;
  name: string;
  shortName: string;
};

type DBInformation = {
  availability: WeeklyAvailability;
};

type LocalServiceStaff = {
  availability: WeeklyAvailability;
};

type TimeTableOffice = {
  email: string;
  name: string;
};

type Szentrale = {
  number: number;
  publicPhoneNumber: string;
  name: string;
};

type StationManagement = {
  number: number;
  name: string;
};

type GeographicCoordinates = {
  type: "Point";
  coordinates: [number, number]; // [longitude, latitude]
};

type Ril100Identifier = {
  rilIdentifier: string;
  isMain: boolean;
  hasSteamPermission: boolean;
  steamPermission: "restricted" | "allowed" | "none";
  geographicCoordinates: GeographicCoordinates;
};

type ProductLine = {
  productLine: string;
  segment: string;
};

// ---------- Main Station type ----------
export type Station = {
  type: "station";
  id: string;
  additionalIds: string[];
  ril100: string;
  nr: number;
  name: string;
  weight: number;

  location: Location;
  operator: Operator;
  address: Address;

  category: number;
  priceCategory: number;

  hasParking: boolean;
  hasBicycleParking: boolean;
  hasLocalPublicTransport: boolean;
  hasPublicFacilities: boolean;
  hasLockerSystem: boolean;
  hasTaxiRank: boolean;
  hasTravelNecessities: boolean;

  hasSteplessAccess: string; // e.g. "yes"
  hasMobilityService: string;

  hasWiFi: boolean;
  hasTravelCenter: boolean;
  hasRailwayMission: boolean;
  hasDBLounge: boolean;
  hasLostAndFound: boolean;
  hasCarRental: boolean;

  federalState: string;

  regionalbereich: Regionalbereich;

  DBinformation: DBInformation;
  localServiceStaff: LocalServiceStaff;

  timeTableOffice: TimeTableOffice;
  szentrale: Szentrale;
  stationManagement: StationManagement;

  ril100Identifiers: Ril100Identifier[];

  productLine: ProductLine;
};

// ---------- Map wrapper (your outer object) ----------
export type StationMap = Record<string, Station>;
