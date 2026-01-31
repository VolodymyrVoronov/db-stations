import { useAtomValue, useSetAtom } from "jotai";
import { TrainFrontIcon } from "lucide-react";
import { lazy, Suspense } from "react";

import { stationAtom } from "@/store/app";
import type { Station } from "@/types";

import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Sidebar, SidebarContent, SidebarGroup } from "@/components/ui/sidebar";
import SelectedStation from "./SelectedStation";
import { Spinner } from "./ui/spinner";

const Autocomplete = lazy(() => import("./Autocomplete"));

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
          <Suspense
            fallback={
              <div className="flex h-full w-full items-center justify-center">
                <Spinner />
              </div>
            }
          >
            <Autocomplete
              onSuggestionClick={onSuggestionClick}
              initialValues={stationsNames}
            />
          </Suspense>
        </SidebarGroup>

        {selectedStation ? (
          <SidebarGroup className="p-0">
            <SelectedStation selectedStation={selectedStation} />
          </SidebarGroup>
        ) : (
          <Empty className="m-2 mt-0 border border-dashed md:m-0">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <TrainFrontIcon className="text-red-600" />
              </EmptyMedia>
              <EmptyTitle>No station selected</EmptyTitle>
              <EmptyDescription>
                Start typing in the search bar above to search for a station
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        )}
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
