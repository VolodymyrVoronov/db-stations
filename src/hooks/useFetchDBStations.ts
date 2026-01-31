import { fetchDBStations } from "@/services/api/db";
import { useQuery } from "@tanstack/react-query";

export const useFetchDBStations = () => {
  const {
    data: stations,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["stations"],
    queryFn: fetchDBStations,
  });

  if (!stations) return { stations, isLoading, isError, error };

  const processedStations = Array.from(
    new Map(
      Object.values(stations).map((station) => [station.id, station]),
    ).values(),
  );

  return {
    stations: processedStations,
    isLoading,
    isError,
    error,
  };
};
