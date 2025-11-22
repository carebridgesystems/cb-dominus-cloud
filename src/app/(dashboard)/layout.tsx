import type { ReactNode } from 'react';
import { AppSidebar } from '@/components/app-sidebar';

/**
 * Dashboard layout with sidebar
 * Will add authentication protection in Phase 3
 */
export default function DashboardLayout({ children }: { children: ReactNode }) {
    return (
        <div className="flex min-h-screen">
            <AppSidebar />
            <main className="flex-1">{children}</main>
        </div>
    );
}

