import { RotateCcwIcon } from "lucide-react";
import { useErrorBoundary } from "react-error-boundary";
import { useTranslation } from "react-i18next";

import InfoScreen from "./InfoScreen";
import { Button } from "./ui/button";

const MapError = () => {
  const { t } = useTranslation("common");

  const { resetBoundary } = useErrorBoundary();

  const onRefreshButtonClick = () => {
    resetBoundary();
  };

  return (
    <div>
      <InfoScreen className="relative h-[calc(100vh-74px)]">
        <div className="flex flex-col gap-2">
          <span>{t("error.title")}</span>

          <Button onClick={onRefreshButtonClick} variant="secondary">
            {t("error.button")} <RotateCcwIcon />
          </Button>
        </div>
      </InfoScreen>
    </div>
  );
};

export default MapError;
