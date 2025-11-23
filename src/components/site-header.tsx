'use client';

import * as React from 'react';
import { SearchForm } from '@/components/search-form';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { usePathname } from 'next/navigation';

export function SiteHeader() {
    const pathname = usePathname();

    // Generate breadcrumbs based on current path
    const getBreadcrumbs = (): Array<{ label: string; href: string; isPage: boolean }> => {
        const paths = pathname.split('/').filter(Boolean);
        const breadcrumbs: Array<{ label: string; href: string; isPage: boolean }> = [];

        if (paths.length === 0 || (paths.length === 1 && paths[0] === 'dashboard')) {
            return [{ label: 'Dashboard', href: '/dashboard', isPage: true }];
        }

        // Build breadcrumb trail
        let currentPath = '';
        paths.forEach((path, index) => {
            currentPath += `/${path}`;
            const isLast = index === paths.length - 1;
            const label = path.charAt(0).toUpperCase() + path.slice(1);
            breadcrumbs.push({
                label,
                href: currentPath,
                isPage: isLast
            });
        });

        return breadcrumbs;
    };

    const breadcrumbs = getBreadcrumbs();

    return (
        <header className='bg-background sticky top-0 z-50 flex h-16 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12'>
            <div className='flex w-full items-center gap-2 px-4'>
                <SidebarTrigger className='-ml-1' />
                <Separator orientation='vertical' className='mr-2 data-[orientation=vertical]:h-4' />
                <Breadcrumb className='hidden sm:block'>
                    <BreadcrumbList>
                        {breadcrumbs.map((crumb, index) => (
                            <React.Fragment key={crumb.href}>
                                {index > 0 && <BreadcrumbSeparator />}
                                <BreadcrumbItem>
                                    {crumb.isPage ? (
                                        <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                                    ) : (
                                        <BreadcrumbLink href={crumb.href}>{crumb.label}</BreadcrumbLink>
                                    )}
                                </BreadcrumbItem>
                            </React.Fragment>
                        ))}
                    </BreadcrumbList>
                </Breadcrumb>
                <SearchForm className='w-full sm:ml-auto sm:w-auto' />
            </div>
        </header>
    );
}

