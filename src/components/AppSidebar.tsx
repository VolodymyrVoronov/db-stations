import { useAtomValue, useSetAtom } from "jotai";
import { TrainFrontIcon } from "lucide-react";
import { lazy, Suspense } from "react";
import { useTranslation } from "react-i18next";

import { stationAtom } from "@/store/app";
import type { Station } from "@/types";

import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { Spinner } from "./ui/spinner";

const SelectedStation = lazy(() => import("./SelectedStation"));

const Autocomplete = lazy(() => import("./Autocomplete"));

export interface ILayoutProps {
  stations?: Station[];
}

const AppSidebar = ({ stations }: ILayoutProps) => {
  const { t } = useTranslation();
  const { isMobile } = useSidebar();

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
            <div className="flex items-center gap-2">
              <Autocomplete
                onSuggestionClick={onSuggestionClick}
                initialValues={stationsNames}
              />

              {isMobile ? (
                <SidebarTrigger
                  className="size-12 rounded-md shadow-none"
                  variant="outline"
                />
              ) : null}
            </div>
          </Suspense>
        </SidebarGroup>

        {selectedStation ? (
          <Suspense
            fallback={
              <div className="flex h-full w-full items-center justify-center">
                <Spinner />
              </div>
            }
          >
            <SidebarGroup className="p-0">
              <SelectedStation selectedStation={selectedStation} />
            </SidebarGroup>
          </Suspense>
        ) : (
          <Empty className="m-2 mt-0 border border-dashed md:m-0">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <TrainFrontIcon className="text-red-600" />
              </EmptyMedia>
              <EmptyTitle>{t("sidebar.empty.title")}</EmptyTitle>
              <EmptyDescription>
                {t("sidebar.empty.description")}
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        )}
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
