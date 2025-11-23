'use client';

import * as React from 'react';
import type { LucideIcon } from 'lucide-react';
import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem
} from '@/registry/new-york-v4/ui/sidebar';

export interface NavSecondaryItem {
    title: string;
    url: string;
    icon: LucideIcon;
}

interface NavSecondaryProps extends React.ComponentPropsWithoutRef<typeof SidebarGroup> {
    items: NavSecondaryItem[];
}

/**
 * NavSecondary - Secondary navigation component for sidebar
 * Typically used for support, help, or additional links
 * Can be positioned at bottom of sidebar with mt-auto
 */
export function NavSecondary({ items, ...props }: NavSecondaryProps) {
    return (
        <SidebarGroup {...props}>
            <SidebarGroupContent>
                <SidebarMenu>
                    {items.map((item) => (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton asChild>
                                <a href={item.url}>
                                    <item.icon />
                                    <span>{item.title}</span>
                                </a>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    );
}

