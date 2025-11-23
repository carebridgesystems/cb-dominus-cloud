'use client';

import * as React from 'react';
import Link from 'next/link';
import {
    LayoutDashboard,
    FolderOpen,
    Key,
    Settings,
    Crown
} from 'lucide-react';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail
} from '@/components/ui/sidebar';
import { NavMain, type NavMainItem } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';

const navigation: NavMainItem[] = [
    {
        title: 'Dashboard',
        url: '/dashboard',
        icon: LayoutDashboard
    },
    {
        title: 'Sovereign',
        url: '/dashboard/sovereign',
        icon: Crown
    },
    {
        title: 'Projects',
        url: '/dashboard/projects',
        icon: FolderOpen
    },
    {
        title: 'Secrets',
        url: '/dashboard/secrets',
        icon: Key
    },
    {
        title: 'Settings',
        url: '/dashboard/settings',
        icon: Settings
    }
];

// Sample user data - TODO: Replace with actual user data from auth/session
const userData = {
    name: 'Admin User',
    email: 'admin@carebridge.systems',
    avatar: '/avatars/default.jpg'
};

/**
 * AppSidebar - Full-height sidebar with header, content, and footer
 * Follows official shadcn/ui sidebar pattern
 * Collapses to icon mode when toggled
 * Uses organized Nav components for better maintainability
 */
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard">
                                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                                    <span className="text-sm font-bold">DC</span>
                                </div>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-semibold">Dominus Cloud</span>
                                    <span className="truncate text-xs text-sidebar-foreground/70">Admin Orchestrator</span>
                                </div>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={navigation} />
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={userData} />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}

