'use client';

import * as React from 'react';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

/**
 * SwitchDemo - Example switch component
 * Demonstrates Switch with Label
 */
export function SwitchDemo() {
    const [airplaneMode, setAirplaneMode] = React.useState(false);
    const [notifications, setNotifications] = React.useState(true);

    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                    <Label htmlFor="airplane-mode">Airplane Mode</Label>
                    <div className="text-sm text-muted-foreground">
                        Turn off all wireless connections
                    </div>
                </div>
                <Switch
                    id="airplane-mode"
                    checked={airplaneMode}
                    onCheckedChange={setAirplaneMode}
                />
            </div>

            <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                    <Label htmlFor="notifications">Notifications</Label>
                    <div className="text-sm text-muted-foreground">
                        Receive push notifications
                    </div>
                </div>
                <Switch
                    id="notifications"
                    checked={notifications}
                    onCheckedChange={setNotifications}
                />
            </div>
        </div>
    );
}


