import type { ReactNode } from "react";

import type { Station } from "@/types";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "./AppSidebar";
import SiteHeader from "./SiteHeader";

export interface ILayoutProps {
  stations?: Station[];

  children: ReactNode;
}

const Layout = ({ stations, children }: ILayoutProps) => {
  return (
    <SidebarProvider>
      <AppSidebar stations={stations} />

      <main className="bg-accent flex flex-1 flex-col gap-2 p-2">
        <SidebarInset className="flex flex-col gap-2 bg-transparent">
          <SiteHeader />

          {children}
        </SidebarInset>
      </main>
    </SidebarProvider>
  );
};

export default Layout;
