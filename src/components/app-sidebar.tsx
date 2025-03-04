"use client";

import {
  Boxes,
  Bug,
  CircleDollarSign,
  History,
  Home,
  PackagePlus,
  Replace,
  ShoppingBasket,
  TicketPercent,
  Users,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";

const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Stock",
    url: "/stock",
    icon: Boxes,
  },
  {
    title: "History",
    url: "/history",
    icon: History,
  },
  {
    title: "Shift",
    url: "/shift",
    icon: Replace,
  },
  {
    title: "Payment",
    url: "/payment",
    icon: CircleDollarSign,
  },
  {
    title: "Voucher",
    url: "/voucher",
    icon: TicketPercent,
  },
  {
    title: "Product",
    url: "/product",
    icon: ShoppingBasket,
  },
  {
    title: "Topping",
    url: "/topping",
    icon: PackagePlus,
  },
  {
    title: "User",
    url: "/user",
    icon: Users,
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-red-500 text-sidebar-primary-foreground">
                  <Bug className="size-5" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Bug Tracker</span>
                  <span className="truncate text-xs">Ver. Alpha</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={items} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
