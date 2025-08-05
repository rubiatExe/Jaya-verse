"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Home, User, Heart, Map, Gift, Mail, GlassWater, Sparkles, CalendarDays, Image as ImageIcon, LogOut, Menu
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const pageTitle = navItems.find(item => item.href === pathname)?.label || "Dashboard";

  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50 flex items-center justify-between h-16 px-4 border-b bg-background/95 backdrop-blur-sm">
        <Link href="/dashboard" className="flex items-center gap-2">
            <Heart className="w-6 h-6 text-primary" />
            <span className="font-headline font-semibold text-lg">Jaya's Universe</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <Button key={item.href} asChild variant="ghost" size="sm" className={pathname === item.href ? 'bg-accent' : ''}>
              <Link href={item.href}>
                <item.icon className="mr-2 h-4 w-4" />
                {item.label}
              </Link>
            </Button>
          ))}
        </nav>

        <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="size-8">
                      <AvatarImage src="https://placehold.co/100x100.png" data-ai-hint="woman smiling" />
                      <AvatarFallback>J</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">Jaya</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      Welcome back!
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                   <Link href="/" legacyBehavior passHref>
                    <a className="w-full justify-start"><Home className="mr-2" />Public View</a>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <LogOut className="mr-2" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Navigation */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="outline" size="icon"><Menu /></Button>
              </SheetTrigger>
              <SheetContent side="left">
                <nav className="grid gap-2 text-lg font-medium mt-8">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${pathname === item.href ? 'text-primary bg-muted' : 'text-muted-foreground'}`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <item.icon className="h-5 w-5" />
                      {item.label}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
        </div>
      </header>
      
      <div className="flex-1 flex flex-col">
          <div className="p-4 border-b">
              <h2 className="text-2xl font-headline font-semibold">
                  {pageTitle}
              </h2>
          </div>
          <main className="p-4 md:p-6 lg:p-8 flex-1">
            {children}
          </main>
      </div>
    </div>
  );
}