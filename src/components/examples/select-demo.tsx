'use client';

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/registry/new-york-v4/ui/select';

/**
 * SelectDemo - Example select component
 * Demonstrates Select, SelectTrigger, SelectContent, SelectItem usage
 */
export function SelectDemo() {
    return (
        <div className="flex flex-col gap-4">
            <Select>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select a theme" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                </SelectContent>
            </Select>

            <Select>
                <SelectTrigger className="w-[300px]">
                    <SelectValue placeholder="Select a framework" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="next">Next.js</SelectItem>
                    <SelectItem value="react">React</SelectItem>
                    <SelectItem value="vue">Vue</SelectItem>
                    <SelectItem value="angular">Angular</SelectItem>
                </SelectContent>
            </Select>
        </div>
    );
}

