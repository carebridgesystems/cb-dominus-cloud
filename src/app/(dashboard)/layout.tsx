import type { ReactNode } from 'react';
import { AppSidebar } from '@/components/app-sidebar';
import { SiteHeader } from '@/components/site-header';
import { SidebarInset, SidebarProvider } from '@/registry/new-york-v4/ui/sidebar';

/**
 * Dashboard layout with full-height sidebar and header
 * Sidebar is full height with its own header
 * Main content area has its own header for breadcrumbs and search
 * Will add authentication protection in Phase 3
 */
export default function DashboardLayout({ children }: { children: ReactNode }) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <SiteHeader />
                <main className="flex flex-1 flex-col gap-4 p-4">
                    {children}
                </main>
            </SidebarInset>
        </SidebarProvider>
    );
}

