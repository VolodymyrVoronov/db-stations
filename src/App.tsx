import { useFetchDBStations } from "./hooks/useFetchDBStations";

import Layout from "./components/Layout";
import Map from "./components/Map";

const App = () => {
  const { stations, isLoading, isError, error } = useFetchDBStations();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error?.message}</div>;

  if (!stations) return <div>No stations found</div>;

  const stationsData = Object.values(stations);

  const selectedStation = stationsData[0];

  // console.log("markers", station);
  // console.log("Object.values(stations)", Object.values(stations));

  return (
    <Layout stations={stationsData}>
      <Map station={selectedStation} />
    </Layout>
  );
};

export default App;
