import type { StationMap } from "@/types";

const DB_API_URL = "https://v6.db.transport.rest/";

export const fetchDBStations = async (): Promise<StationMap> => {
  const url = `${DB_API_URL}stations`;

  try {
    const response = await fetch(url);

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching DB stations:", error);
    throw error;
  }
};
