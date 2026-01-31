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

  return {
    stations,
    isLoading,
    isError,
    error,
  };
};
