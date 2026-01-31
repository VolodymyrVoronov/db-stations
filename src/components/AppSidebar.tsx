import { useAtomValue, useSetAtom } from "jotai";

import { stationAtom } from "@/store/app";
import type { Station } from "@/types";

import { Sidebar, SidebarContent, SidebarGroup } from "@/components/ui/sidebar";
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

  return (
    <Sidebar variant="inset" className="bg-accent">
      <SidebarContent className="bg-accent">
        <SidebarGroup className="md:p-0">
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
    </Sidebar>
  );
};

export default AppSidebar;
