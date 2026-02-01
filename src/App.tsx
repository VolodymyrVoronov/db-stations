import { lazy, Suspense } from "react";
import { useTranslation } from "react-i18next";

import { useFetchDBStations } from "./hooks/useFetchDBStations";

import InfoScreen from "./components/InfoScreen";
import Layout from "./components/Layout";
import LoadingScreen from "./components/LoadingScreen";
import { Spinner } from "./components/ui/spinner";

const MapComponent = lazy(() => import("./components/MapComponent"));

const App = () => {
  const { t } = useTranslation();

  const { stations, isLoading, isError, error } = useFetchDBStations();

  if (isLoading) return <LoadingScreen />;

  if (isError)
    return (
      <InfoScreen>
        {t("error.message")} {error?.message}
      </InfoScreen>
    );

  if (!stations?.length) return <InfoScreen>{t("nothing.found")}</InfoScreen>;

  return (
    <Layout stations={stations}>
      <Suspense
        fallback={
          <div className="flex h-full w-full items-center justify-center">
            <Spinner />
          </div>
        }
      >
        <MapComponent stations={stations} />
      </Suspense>
    </Layout>
  );
};

export default App;
