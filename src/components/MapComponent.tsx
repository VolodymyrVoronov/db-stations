import { useAtomValue } from "jotai";
import { TrainFrontIcon } from "lucide-react";
import { ErrorBoundary } from "react-error-boundary";

import { stationAtom } from "@/store/app";
import type { Station } from "@/types";

import {
  Map,
  MapControls,
  MapMarker,
  MarkerContent,
  MarkerPopup,
} from "@/components/ui/map";
import MapError from "./MapError";
import MapSearchControlWrapper from "./MapSearchControlWrapper";

export interface IMapComponentProps {
  stations?: Station[];
}

const LATITUDE = 51.1657;
const LONGITUDE = 10.4515;

const MapComponent = ({ stations }: IMapComponentProps) => {
  const station = useAtomValue(stationAtom);

  const selectedStation = stations?.find((s) => s.name === station);
  const { longitude = LONGITUDE, latitude = LATITUDE } =
    selectedStation?.location || {};

  return (
    <ErrorBoundary fallback={<MapError />} resetKeys={[selectedStation?.name]}>
      <Map center={[LONGITUDE, LATITUDE]} zoom={6}>
        <MapControls showZoom showLocate showCompass showFullscreen />

        {selectedStation ? (
          <MapSearchControlWrapper coordinates={[longitude, latitude]}>
            <MapMarker longitude={longitude} latitude={latitude}>
              <MarkerContent>
                <TrainFrontIcon className="text-red-600" />
              </MarkerContent>
              <MarkerPopup closeButton className="w-auto px-6">
                <div className="flex flex-col gap-1 text-center">
                  <span className="text-sm font-semibold">
                    {selectedStation?.name}
                  </span>
                  <span>
                    {selectedStation?.address?.zipcode}{" "}
                    {selectedStation?.address?.city}
                  </span>
                  <span>{selectedStation?.address?.street}</span>
                  <span>{selectedStation?.federalState}</span>
                </div>
              </MarkerPopup>
            </MapMarker>
          </MapSearchControlWrapper>
        ) : null}
      </Map>
    </ErrorBoundary>
  );
};

export default MapComponent;
