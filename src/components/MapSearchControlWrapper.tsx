import type { LatLngExpression } from "leaflet";
import { useEffect, type ReactNode } from "react";
import { useMap } from "react-leaflet";

export interface IMapSearchControlWrapperProps {
  coordinates: LatLngExpression;

  children: ReactNode;
}

const MapSearchControlWrapper = ({
  coordinates,

  children,
}: IMapSearchControlWrapperProps) => {
  const map = useMap();

  useEffect(() => {
    if (!coordinates) return;

    map.panTo(coordinates);
    map.setView(coordinates, 15);
  }, [map, coordinates]);

  return children;
};

export default MapSearchControlWrapper;
