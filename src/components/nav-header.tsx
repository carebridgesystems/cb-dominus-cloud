'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle
} from '@/components/ui/navigation-menu';

/**
 * Navigation header component
 * Fixed to follow official shadcn/ui patterns
 * Uses navigationMenuTriggerStyle() for proper styling
 */
export function NavHeader() {
    const pathname = usePathname();

    const navItems = [
        { href: '/', label: 'Home' },
        { href: '/dashboard', label: 'Dashboard' },
        { href: '/dashboard/projects', label: 'Projects' },
        { href: '/dashboard/secrets', label: 'Secrets' }
    ];

    return (
        <NavigationMenu>
            <NavigationMenuList className="gap-1">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <NavigationMenuItem key={item.href}>
                            <NavigationMenuLink asChild>
                                <Link
                                    href={item.href}
                                    className={cn(
                                        navigationMenuTriggerStyle(),
                                        isActive && 'bg-accent'
                                    )}
                                >
                                    {item.label}
                                </Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                    );
                })}
            </NavigationMenuList>
        </NavigationMenu>
    );
}
