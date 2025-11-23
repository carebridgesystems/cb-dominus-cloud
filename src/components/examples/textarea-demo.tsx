import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

/**
 * TextareaDemo - Example textarea component
 * Demonstrates Textarea with Label and Button
 */
export function TextareaDemo() {
    return (
        <div className="grid w-full gap-4">
            <div className="grid gap-2">
                <Label htmlFor="message">Your message</Label>
                <Textarea placeholder="Type your message here." id="message" />
            </div>
            <div className="flex items-center gap-2">
                <Button>Send message</Button>
                <Button variant="outline">Cancel</Button>
            </div>
        </div>
    );
}

