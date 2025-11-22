import type { ReactNode } from 'react';
import { AppSidebar } from '@/components/app-sidebar';
import { SiteHeader } from '@/components/site-header';
import { SidebarInset, SidebarProvider } from '@/registry/new-york-v4/ui/sidebar';

/**
 * Dashboard layout with sidebar and header
 * Will add authentication protection in Phase 3
 */
export default function DashboardLayout({ children }: { children: ReactNode }) {
    return (
        <div className='[--header-height:calc(--spacing(14))]'>
            <SidebarProvider className='flex flex-col'>
                <SiteHeader />
                <div className='flex flex-1'>
                    <AppSidebar />
                    <SidebarInset>
                        {children}
                    </SidebarInset>
                </div>
            </SidebarProvider>
        </div>
    );
}

