import { useFetchDBStations } from "./hooks/useFetchDBStations";

import Layout from "./components/Layout";
import MapComponent from "./components/MapComponent";

const App = () => {
  const { stations, isLoading, isError, error } = useFetchDBStations();

  if (isLoading) return <div>Loading...</div>;

  if (isError) return <div>Error: {error?.message}</div>;

  if (!stations?.length) return <div>No stations found</div>;

  return (
    <Layout stations={stations}>
      <MapComponent stations={stations} />
    </Layout>
  );
};

export default App;
