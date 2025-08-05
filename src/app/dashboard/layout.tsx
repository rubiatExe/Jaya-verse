"use client";

import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarTrigger,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Home, User, Heart, Map, Gift, Mail, GlassWater, Sparkles, CalendarDays, Image as ImageIcon, LogOut } from 'lucide-react';
import { usePathname } from "next/navigation";
import Link from "next/link";

const navItems = [
    { href: "/dashboard", icon: User, label: "Life RPG" },
    { href: "/dashboard/friend-map", icon: Map, label: "Friend Map" },
    { href: "/dashboard/reasons-jar", icon: Gift, label: "Reasons Jar" },
    { href: "/dashboard/open-when", icon: Mail, label: "Open When..." },
    { href: "/dashboard/water-tracker", icon: GlassWater, label: "Water Tracker" },
    { href: "/dashboard/self-talk", icon: Sparkles, label: "Self-Talk Sesh" },
    { href: "/dashboard/cycle-tracker", icon: CalendarDays, label: "Cycle Tracker" },
    { href: "/dashboard/dream-board", icon: ImageIcon, label: "Dream Board" },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2">
            <Heart className="w-6 h-6 text-primary" />
            <span className="font-headline font-semibold text-lg">Jaya's Universe</span>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <Link href={item.href} legacyBehavior passHref>
                  <SidebarMenuButton asChild isActive={pathname === item.href} tooltip={item.label}>
                    <a>
                      <item.icon />
                      <span>{item.label}</span>
                    </a>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
           <SidebarMenu>
             <SidebarMenuItem>
                <Link href="/" legacyBehavior passHref>
                  <SidebarMenuButton asChild tooltip="Public View">
                    <a><Home /><span>Public View</span></a>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                 <SidebarMenuButton asChild tooltip="Logout">
                    <a>
                        <Avatar className="size-8">
                            <AvatarImage src="https://placehold.co/100x100.png" data-ai-hint="woman smiling" />
                            <AvatarFallback>J</AvatarFallback>
                        </Avatar>
                        <span className="flex-grow">Jaya</span>
                        <LogOut />
                    </a>
                 </SidebarMenuButton>
              </SidebarMenuItem>
           </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="flex items-center justify-between p-4 border-b">
            <SidebarTrigger />
            <h2 className="text-2xl font-headline font-semibold">
                {navItems.find(item => item.href === pathname)?.label || "Dashboard"}
            </h2>
            <div/>
        </header>
        <main className="p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
