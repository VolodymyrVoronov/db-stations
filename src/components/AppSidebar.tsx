import type { Station } from "@/types";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarInset,
} from "@/components/ui/sidebar";

export interface ILayoutProps {
  stations?: Station[];
}

const AppSidebar = ({ stations }: ILayoutProps) => {
  return (
    <Sidebar variant="inset" className="bg-accent">
      <SidebarContent className="bg-accent">
        <SidebarGroup>Test</SidebarGroup>
        <SidebarGroup>Station</SidebarGroup>
      </SidebarContent>

      {/* <SidebarFooter /> */}
    </Sidebar>
  );
};

export default AppSidebar;
