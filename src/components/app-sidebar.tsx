import React from "react";
import { AppWindow, AppWindowMac, ArrowRight, BriefcaseBusiness, ChartArea, ChartBar, Component, File, Folder, Home, PlaneLanding, Users, ChevronDown } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";

type SidebarSubItem = {
  title: string;
  url: string;
};

type SidebarNavItem = {
  title: string;
  url?: string;
  icon: React.ElementType;
  children?: SidebarSubItem[];
};

// Menu items.
const items: SidebarNavItem[] = [
  {
    title: "Marketing",
    url: "/modules/marketting",
    icon: ChartBar,
  },
  {
    title: "Analysis",
    url: "/modules/dashboard",
    icon: Home,
  },
  {
    title: "Business",
    url: "#",
    icon: BriefcaseBusiness,
  },
  {
    title: "HRM",
    url: "#",
    icon: ChartArea,
  },
  {
    title: "Mobile App",
    url: "#",
    icon: AppWindow,
  },
  {
    title: "Landing page",
    url: "#",
    icon: PlaneLanding,
  },
  {
    title: "Component",
    url: "#",
    icon: Component,
  },
  {
    title: "Pages",
    url: "#",
    icon: File,
  },
  {
    title: "Apps",
    icon: AppWindowMac,
    children: [
      { title: "Calender", url: "#" },
      { title: "Email", url: "/modules/apps/emails" },
      { title: "Invoice", url: "#" },
      { title: "Charts", url: "#" },
      { title: "Widget", url: "#" },
    ],
  },
  {
    title: "Contents",
    icon: File,
    children: [
      { title: "Articles", url: "#" },
      { title: "Media Library", url: "#" },
      { title: "Drafts", url: "#" },
    ],
  },
  {
    title: "Users",
    icon: Users,
    children: [
      { title: "All Users", url: "#" },
      { title: "Teams", url: "#" },
      { title: "Permissions", url: "#" },
    ],
  },
  {
    title: "Documentation",
    icon: Folder,
    children: [
      { title: "Guides", url: "#" },
      { title: "API Docs", url: "#" },
      { title: "Support", url: "#" },
    ],
  },
];

export function AppSidebar() {
  const [openSections, setOpenSections] = React.useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    items.forEach((item) => {
      if (item.children) {
        initial[item.title] = false;
      }
    });
    return initial;
  });

  const toggleSection = (title: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-lg font-bold h-20">Brutalism</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const isOpen = !!openSections[item.title];

                return (
                  <SidebarMenuItem className="mb-4" key={item.title}>
                    {item.children ? (
                      <>
                        <SidebarMenuButton
                          type="button"
                          aria-expanded={isOpen}
                          onClick={() => toggleSection(item.title)}
                          className="justify-between"
                        >
                          <div className="flex items-center gap-2">
                            <item.icon />
                            <span>{item.title}</span>
                          </div>
                          <ChevronDown
                            className={`ml-auto h-4 w-4 transition-transform ${
                              isOpen ? "rotate-180" : ""
                            }`}
                          />
                        </SidebarMenuButton>
                        {isOpen && (
                          <SidebarMenuSub>
                            {item.children.map((child) => (
                              <SidebarMenuSubItem key={child.title}>
                                <SidebarMenuSubButton asChild>
                                  <a href={child.url}>
                                    <span>{child.title}</span>
                                  </a>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            ))}
                          </SidebarMenuSub>
                        )}
                      </>
                    ) : (
                      <SidebarMenuButton asChild>
                        <a href={item.url}>
                          <item.icon />
                          <span>{item.title}</span>
                        </a>
                      </SidebarMenuButton>
                    )}
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <div className="px-4 pb-6 mt-6">
          <div className="rounded-xl border border-gray-200 bg-white p-4 text-sm shadow-sm">
            <p className="text-base font-semibold text-gray-900">
              Upgrade to Pro
            </p>
            <p className="mt-1 text-xs text-gray-500">
              Looking for more features? Try our Pro version.
            </p>
            <button
              type="button"
              className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-lime-400 py-2 text-sm font-semibold text-gray-900 transition hover:bg-lime-500"
            >
              <span>Upgrade Now</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
