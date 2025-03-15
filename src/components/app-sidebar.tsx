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
import { decrypt } from "@/lib/actions/session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";

export async function AppSidebar() {
  const cookie = (await cookies()).get("session")?.value;

  // Cek apakah sesi tersedia
  if (!cookie) {
    redirect("/");
  }

  const session = await decrypt(cookie);
  if (!session) {
    redirect("/");
  }

  const user = await prisma.user.findUnique({
    where: {
      id: session.id as string,
    },
    select: {
      id: true,
      username: true,
      role: true, // Pastikan role diambil
    },
  });

  if (!user) {
    redirect("/");
  }

  const role = session.role as string;

  return (
    <Sidebar>
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
        <NavMain role={role} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser dataUser={user} />
      </SidebarFooter>
    </Sidebar>
  );
}
