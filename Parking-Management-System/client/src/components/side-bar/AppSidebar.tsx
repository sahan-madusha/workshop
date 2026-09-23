import * as React from "react";
import { GalleryVerticalEnd, Menu, X } from "lucide-react";

import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";
import { TeamSwitcher } from "./team-switcher";
import { useAppBranding } from "../../Hook";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  useSidebar,
} from "../ui/sidebar";
import { useAuthChecker } from "../../Context";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useAuthChecker();
  const { appName } = useAppBranding();
  const { state, isMobile, toggleSidebar } = useSidebar();

  const sidebarTeams = [
    {
      name: appName,
      logo: GalleryVerticalEnd,
      plan: "Parking Management",
    },
  ];

  return (
    <>
      <Sidebar collapsible="icon" {...props}>
        <SidebarHeader>
          <TeamSwitcher teams={sidebarTeams} />
        </SidebarHeader>

        <SidebarContent>
          <NavMain />
        </SidebarContent>

        <SidebarFooter>
          <NavUser user={user} />
        </SidebarFooter>

        <SidebarRail />
      </Sidebar>

      <div
        className="fixed top-4 z-40 transition-all duration-200 ease-linear"
        style={{
          left: isMobile
            ? "0.75rem"
            : state === "expanded"
              ? "calc(var(--sidebar-width) + 1.5rem)"
              : "3.5rem",
        }}
      >
        <button
          type="button"
          data-sidebar="trigger"
          aria-label="Toggle Sidebar"
          title="Toggle Sidebar"
          onClick={() => toggleSidebar()}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-white shadow-md transition-colors hover:bg-slate-800"
        >
          {state === "expanded" ? (
            <X className="size-4" />
          ) : (
            <Menu className="size-4" />
          )}
        </button>
      </div>
    </>
  );
}
