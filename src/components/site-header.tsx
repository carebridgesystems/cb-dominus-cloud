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
} from '@/registry/new-york-v4/ui/breadcrumb';
import { Button } from '@/registry/new-york-v4/ui/button';
import { Separator } from '@/registry/new-york-v4/ui/separator';
import { useSidebar } from '@/registry/new-york-v4/ui/sidebar';

import { SidebarIcon } from 'lucide-react';
import { usePathname } from 'next/navigation';

export function SiteHeader() {
    const { toggleSidebar } = useSidebar();
    const pathname = usePathname();

    // Generate breadcrumbs based on current path
    const getBreadcrumbs = () => {
        const paths = pathname.split('/').filter(Boolean);
        const breadcrumbs = [];

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
        <header className='bg-background sticky top-0 z-50 flex w-full items-center border-b'>
            <div className='flex h-(--header-height) w-full items-center gap-2 px-4'>
                <Button className='h-8 w-8' variant='ghost' size='icon' onClick={toggleSidebar}>
                    <SidebarIcon />
                </Button>
                <Separator orientation='vertical' className='mr-2 h-4' />
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

