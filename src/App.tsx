import { useFetchDBStations } from "./hooks/useFetchDBStations";

import InfoScreen from "./components/InfoScreen";
import Layout from "./components/Layout";
import LoadingScreen from "./components/LoadingScreen";
import MapComponent from "./components/MapComponent";

const App = () => {
  const { stations, isLoading, isError, error } = useFetchDBStations();

  if (isLoading) return <LoadingScreen />;

  if (isError) return <InfoScreen>Error: {error?.message}</InfoScreen>;

  if (!stations?.length) return <InfoScreen>No stations found</InfoScreen>;

  return (
    <Layout stations={stations}>
      <MapComponent stations={stations} />
    </Layout>
  );
};

export default App;
