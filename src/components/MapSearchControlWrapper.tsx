import { useEffect, type ReactNode } from "react";

import { useMap } from "./ui/map";

export interface IMapSearchControlWrapperProps {
  coordinates: [number, number];

  children: ReactNode;
}

const MapSearchControlWrapper = ({
  coordinates,

  children,
}: IMapSearchControlWrapperProps) => {
  const { map, isLoaded } = useMap();

  useEffect(() => {
    if (!coordinates) return;

    if (!isLoaded || !map) return;

    map.flyTo({
      center: coordinates,
      zoom: 15,
    });
  }, [map, coordinates, isLoaded]);

  return children;
};

export default MapSearchControlWrapper;
