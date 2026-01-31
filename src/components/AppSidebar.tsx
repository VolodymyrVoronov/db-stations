import { useSetAtom, useAtomValue } from "jotai";

import type { Station } from "@/types";
import { stationAtom } from "@/store/app";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarInset,
} from "@/components/ui/sidebar";
import Autocomplete from "./Autocomplete";
import SelectedStation from "./SelectedStation";

export interface ILayoutProps {
  stations?: Station[];
}

const AppSidebar = ({ stations }: ILayoutProps) => {
  const station = useAtomValue(stationAtom);
  const setStation = useSetAtom(stationAtom);

  const stationsNames = stations?.map((station) => station.name);
  const selectedStation = stations?.find((s) => s.name === station);

  const onSuggestionClick = (station: string) => {
    if (!stations) return;

    setStation(station);
  };

  console.log("selectedStation", selectedStation);

  return (
    <Sidebar variant="inset" className="bg-accent">
      <SidebarContent className="bg-accent">
        <SidebarGroup className="p-0">
          <Autocomplete
            onSuggestionClick={onSuggestionClick}
            initialValues={stationsNames}
          />
        </SidebarGroup>

        {selectedStation ? (
          <SidebarGroup className="p-0">
            <SelectedStation selectedStation={selectedStation} />
          </SidebarGroup>
        ) : null}
      </SidebarContent>

      {/* <SidebarFooter /> */}
    </Sidebar>
  );
};

export default AppSidebar;
