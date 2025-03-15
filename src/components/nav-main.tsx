"use client";

import {
  Box,
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
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";

const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
    visible: ["cashier", "admin"],
  },
  {
    title: "History",
    url: "/history",
    icon: History,
    visible: ["cashier", "admin"],
  },
  {
    title: "Shift",
    url: "/shift",
    icon: Replace,
    visible: ["cashier"],
  },
  {
    title: "Payment",
    url: "/payment",
    icon: CircleDollarSign,
    visible: ["admin"],
  },
  {
    title: "Voucher",
    url: "/voucher",
    icon: TicketPercent,
    visible: ["admin"],
  },
  {
    title: "Category",
    url: "/category",
    icon: Box,
    visible: ["cashier", "admin"],
  },
  {
    title: "Product",
    url: "/product",
    icon: ShoppingBasket,
    visible: ["cashier", "admin"],
  },
  {
    title: "Topping",
    url: "/topping",
    icon: PackagePlus,
    visible: ["cashier", "admin"],
  },
  {
    title: "User",
    url: "/user",
    icon: Users,
    visible: ["admin"],
  },
];

export function NavMain({ role }: { role: string }) {
  const pathname = usePathname();
  const isActiveLink = (href: string) =>
    pathname === href || pathname.startsWith(href);

  return (
    <SidebarGroup>
      <SidebarMenu>
        {items
          .filter((item) => item.visible.includes(role))
          .map((item) => {
            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  className={`${
                    isActiveLink(item.url)
                      ? "bg-slate-200 hover:bg-slate-300 dark:text-black"
                      : ""
                  }`}
                  asChild
                  tooltip={item.title}
                >
                  <a href={item.url}>
                    <item.icon />
                    <span>{item.title}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
