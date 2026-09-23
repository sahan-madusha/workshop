import React from "react";
import { LayoutDashboard } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";

export function NavMain({
  items,
  navigationPath,
}: {
  items?: any;
  navigationPath?: any;
}) {
  const location = useLocation();

  const isDashboardActive =
    location.pathname.includes("dashboard_overview") ||
    location.pathname === "/system" ||
    location.pathname === "/system/";

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Menu</SidebarGroupLabel>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton
            asChild
            isActive={isDashboardActive}
            tooltip="Dashboard"
          >
            <Link
              to="/system/dashboard_overview"
              className="flex items-center gap-3 font-medium text-slate-700 hover:text-indigo-600 transition-colors"
            >
              <LayoutDashboard className="size-4 text-indigo-600" />
              <span>Dashboard</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  );
}
