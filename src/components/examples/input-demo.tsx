import { Button } from '@/registry/new-york-v4/ui/button';
import { Input } from '@/registry/new-york-v4/ui/input';
import { Label } from '@/registry/new-york-v4/ui/label';

/**
 * InputDemo - Example input component
 * Demonstrates Input with Label and Button
 */
export function InputDemo() {
    return (
        <div className="grid w-full max-w-sm gap-4">
            <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input type="email" id="email" placeholder="m@example.com" />
            </div>
            <div className="flex gap-2">
                <Input type="search" placeholder="Search..." className="flex-1" />
                <Button type="submit">Search</Button>
            </div>
            <div className="grid gap-2">
                <Label htmlFor="disabled">Disabled</Label>
                <Input id="disabled" disabled placeholder="Disabled input" />
            </div>
        </div>
    );
}

