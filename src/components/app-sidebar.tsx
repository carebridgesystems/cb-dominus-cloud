'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    FolderOpen,
    Key,
    Settings
} from 'lucide-react';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail
} from '@/registry/new-york-v4/ui/sidebar';
import { ModeToggle } from '@/components/mode-toggle';

const navigation = [
    {
        title: 'Dashboard',
        url: '/dashboard',
        icon: LayoutDashboard
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

/**
 * AppSidebar - Full-height sidebar with header, content, and footer
 * Follows official shadcn/ui sidebar pattern
 * Collapses to icon mode when toggled
 */
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const pathname = usePathname();

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
                <SidebarGroup>
                    <SidebarGroupLabel>Navigation</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {navigation.map((item) => {
                                const isActive = pathname === item.url;
                                return (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton asChild isActive={isActive}>
                                            <Link href={item.url}>
                                                <item.icon />
                                                <span>{item.title}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                );
                            })}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <div className="flex items-center justify-between px-2 py-2">
                            <ModeToggle />
                            <div className="group-data-[collapsible=icon]:hidden text-xs text-sidebar-foreground/70">
                                CareBridge Systems
                            </div>
                        </div>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}
