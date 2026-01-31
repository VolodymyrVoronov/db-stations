import { useAtomValue } from "jotai";
import { TrainFrontIcon } from "lucide-react";

import { stationAtom } from "@/store/app";
import type { Station } from "@/types";

import {
  Map,
  MapLocateControl,
  MapMarker,
  MapPopup,
  MapTileLayer,
  MapZoomControl,
} from "@/components/ui/map";
import MapSearchControlWrapper from "./MapSearchControlWrapper";

export interface IMapComponentProps {
  stations?: Station[];
}

const LATITUDE = 51.1657;
const LONGITUDE = 10.4515;

const MapComponent = ({ stations }: IMapComponentProps) => {
  const station = useAtomValue(stationAtom);

  const selectedStation = stations?.find((s) => s.name === station);
  const { latitude = LATITUDE, longitude = LONGITUDE } =
    selectedStation?.location || {};

  return (
    <Map center={[LATITUDE, LONGITUDE]} zoom={6} markerZoomAnimation>
      <MapTileLayer detectRetina />
      <MapZoomControl />
      <MapLocateControl />

      {selectedStation ? (
        <MapSearchControlWrapper coordinates={[latitude, longitude]}>
          <MapMarker
            position={[latitude, longitude]}
            icon={<TrainFrontIcon className="text-red-600" />}
          >
            <MapPopup>
              <div className="flex flex-col gap-1">
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
            </MapPopup>
          </MapMarker>
        </MapSearchControlWrapper>
      ) : null}
    </Map>
  );
};

export default MapComponent;
