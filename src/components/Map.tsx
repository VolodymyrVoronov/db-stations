import {
  Map as MapComponent,
  MapMarker,
  MapPopup,
  MapTileLayer,
  MapZoomControl,
} from "@/components/ui/map";
import type { Station } from "@/types";

export interface IMapProps {
  station?: Station;
}

const Map = ({ station }: IMapProps) => {
  console.log("station", station);

  return (
    <MapComponent center={[51.1657, 10.4515]} zoom={6} markerZoomAnimation>
      <MapTileLayer />
      <MapZoomControl />

      <MapMarker position={[43.6532, -79.3832]}>
        <MapPopup>A map component for shadcn/ui.</MapPopup>
      </MapMarker>
    </MapComponent>
  );
};

export default Map;
