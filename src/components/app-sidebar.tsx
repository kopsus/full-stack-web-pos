"use client";

import {
  Box,
  Boxes,
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
import Image from "next/image";

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
    title: "Category",
    url: "/category",
    icon: Box,
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
              <div className="h-auto">
                <Image
                  src="/logo.svg"
                  alt="logo"
                  width={0}
                  height={0}
                  sizes="100vw"
                />
              </div>
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
