'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    FolderOpen,
    Key,
    Settings,
    ChevronRightIcon
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

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const pathname = usePathname();

    return (
        <Sidebar className='top-(--header-height) h-[calc(100svh-var(--header-height))]!' collapsible='icon' {...props}>
            <SidebarHeader>
                <div className="flex items-center gap-2 px-2 py-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                        <span className="text-sm font-bold">DC</span>
                    </div>
                    <div className="group-data-[collapsible=icon]:hidden">
                        <div className="text-sm font-semibold">Dominus Cloud</div>
                        <div className="text-xs text-muted-foreground">Admin Orchestrator</div>
                    </div>
                </div>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel className='group-data-[collapsible=icon]:hidden'>Navigation</SidebarGroupLabel>
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
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <div className="flex items-center justify-between px-2 py-2">
                    <ModeToggle />
                    <div className="group-data-[collapsible=icon]:hidden text-xs text-muted-foreground">
                        CareBridge Systems
                    </div>
                </div>
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}
