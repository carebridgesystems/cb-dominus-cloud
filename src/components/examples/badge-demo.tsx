import { Badge } from '@/registry/new-york-v4/ui/badge';

/**
 * BadgeDemo - Example badge component
 * Demonstrates various Badge variants
 */
export function BadgeDemo() {
    return (
        <div className="flex flex-wrap items-center gap-2">
            <Badge>Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="destructive">Destructive</Badge>
            <Badge variant="outline">Outline</Badge>
        </div>
    );
}

