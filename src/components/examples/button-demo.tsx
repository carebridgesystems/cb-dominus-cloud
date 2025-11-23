import { ArrowRight, Download, Mail } from 'lucide-react';
import { Button } from '@/registry/new-york-v4/ui/button';

/**
 * ButtonDemo - Example button components
 * Demonstrates various Button variants and sizes
 */
export function ButtonDemo() {
    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-wrap items-center gap-2">
                <Button>Default</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="destructive">Destructive</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="link">Link</Button>
            </div>

            <div className="flex flex-wrap items-center gap-2">
                <Button size="sm">Small</Button>
                <Button>Default</Button>
                <Button size="lg">Large</Button>
            </div>

            <div className="flex flex-wrap items-center gap-2">
                <Button variant="outline" size="icon" aria-label="Mail">
                    <Mail />
                </Button>
                <Button variant="outline">
                    <Download /> Download
                </Button>
                <Button variant="outline">
                    Continue <ArrowRight />
                </Button>
            </div>
        </div>
    );
}

