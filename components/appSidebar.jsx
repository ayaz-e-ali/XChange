'use client';
import { Home, Users, Search, Settings, HandCoins } from "lucide-react";

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOutUser } from "@/actions/auth";

export function AppSidebar({ user }) {
    const adminItems = [
        {
            title: "المستخدمون",
            url: "/dashboard/users",
            icon: Users,
        }
    ]

    const items = [
        {
            title: "ايداع",
            url: "/dashboard",
            icon: Home,
        },
        {
            title: "عمليات الايداع",
            url: "/dashboard/search",
            icon: Search,
        },
        {
            title: "الديون",
            url: "/dashboard/debts",
            icon: HandCoins,
        },
        {
            title: "الاعدادات",
            url: "/dashboard/settings",
            icon: Settings,
        },
    ];
    if (user.isAdmin) {
        items.push(...adminItems)
    }

    const pathName = usePathname();
    return (
        <Sidebar>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel> </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title} >
                                    <SidebarMenuButton size="lg" asChild isActive={pathName == item.url}>
                                        <Link href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton onClick={() => signOutUser()} size="lg">
                            تسجيل الخروج
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    );
}
