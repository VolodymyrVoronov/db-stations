import { RotateCcwIcon } from "lucide-react";
import { useErrorBoundary } from "react-error-boundary";

import InfoScreen from "./InfoScreen";
import { Button } from "./ui/button";

const MapError = () => {
  const { resetBoundary } = useErrorBoundary();

  const onRefreshButtonClick = () => {
    resetBoundary();
  };

  return (
    <div>
      <InfoScreen className="relative h-[calc(100vh-74px)]">
        <div className="flex flex-col gap-2">
          <span>Error loading map</span>

          <Button onClick={onRefreshButtonClick} variant="secondary">
            Try again <RotateCcwIcon />
          </Button>
        </div>
      </InfoScreen>
    </div>
  );
};

export default MapError;
