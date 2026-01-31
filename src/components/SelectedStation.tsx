import type { Station } from "@/types";

export interface ISelectedStationProps {
  selectedStation?: Station;
}

const SelectedStation = ({ selectedStation }: ISelectedStationProps) => {
  return <div>{selectedStation?.name}</div>;
};

export default SelectedStation;
