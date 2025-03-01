"use client";

import * as React from "react";
import { Menu } from "lucide-react"; // Import the Menu icon
import {
  Command,
  LifeBuoy,
  Send,
  Database,
  Smile,
  Settings2,
  MessageSquareText,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar, // Import useSidebar to access sidebar state
} from "@/components/ui/sidebar";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Give Feedback",
      url: "/dashboard",
      icon: Smile,
      isActive: true,
      items: [
        {
          title: "My Feedback History",
          url: "/dashboard/my-feedback",
        },
        {
          title: "Top Restaurants",
          url: "/dashboard/topRated",
        },
      ],
    },
    {
      title: "Community Sentiment",
      url: "/dashboard/community-sentiment",
      icon: MessageSquareText,
    },
    {
      title: "Download My Data",
      url: "/dashboard/download",
      icon: Database,
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
    },
  ],
  navSecondary: [
    {
      title: "Support",
      url: "#",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "#",
      icon: Send,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { isMobile, openMobile, setOpenMobile } = useSidebar(); // Use the sidebar context

  return (
    <>
      {/* Mobile Toggle Button */}
      {isMobile && (
        <button
          className="fixed left-4 top-4 z-50 rounded-lg bg-sidebar-primary p-2 text-sidebar-primary-foreground lg:hidden"
          onClick={() => setOpenMobile(!openMobile)}
        >
          <Menu className="size-6" />
        </button>
      )}

      {/* Sidebar */}
      <Sidebar
        className={`fixed left-0 top-0 !h-[100svh] w-64 bg-sidebar-primary transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isMobile && !openMobile ? "-translate-x-full" : "translate-x-0"
        }`}
        {...props}
      >
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" asChild>
                <a href="#">
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                    <Command className="size-4" />
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">EFS</span>
                    <span className="truncate text-xs">Emoji Feedback System</span>
                  </div>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <NavMain items={data.navMain} />
          <NavSecondary items={data.navSecondary} className="mt-auto" />
        </SidebarContent>
        <SidebarFooter>
          <NavUser user={data.user} />
        </SidebarFooter>
      </Sidebar>

      {/* Overlay for Mobile */}
      {isMobile && openMobile && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setOpenMobile(false)}
        />
      )}
    </>
  );
}