'use client';

import * as React from 'react';
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem
} from '@/components/ui/sidebar';
import { ModeToggle } from '@/components/mode-toggle';

/**
 * NavFooter - Footer component for sidebar
 * Displays theme toggle and branding
 */
export function NavFooter() {
    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <div className='flex items-center justify-between px-2 py-2'>
                    <ModeToggle />
                    <div className='group-data-[collapsible=icon]:hidden text-xs text-sidebar-foreground/70'>
                        CareBridge Systems
                    </div>
                </div>
            </SidebarMenuItem>
        </SidebarMenu>
    );
}


