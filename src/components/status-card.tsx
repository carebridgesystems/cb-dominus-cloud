'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, AlertTriangle, HelpCircle } from 'lucide-react';

export type ServiceStatus = 'ok' | 'warn' | 'error' | 'unknown';

export interface StatusCardProps {
    title: string;
    status: ServiceStatus;
    lastChecked?: string;
    icon?: React.ReactNode;
    description?: string;
}

/**
 * StatusCard - Health status indicator for services
 * Displays service name, status badge, and optional metadata
 */
export function StatusCard({ title, status, lastChecked, icon, description }: StatusCardProps) {
    const statusConfig = {
        ok: {
            variant: 'default' as const,
            icon: CheckCircle,
            label: 'OK',
            color: 'text-green-500'
        },
        warn: {
            variant: 'outline' as const,
            icon: AlertTriangle,
            label: 'Warning',
            color: 'text-amber-500'
        },
        error: {
            variant: 'destructive' as const,
            icon: XCircle,
            label: 'Error',
            color: 'text-red-500'
        },
        unknown: {
            variant: 'secondary' as const,
            icon: HelpCircle,
            label: 'Unknown',
            color: 'text-muted-foreground'
        }
    };

    const config = statusConfig[status];
    const StatusIcon = config.icon;

    return (
        <Card className="w-full">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="flex items-center gap-2">
                    {icon}
                    <CardTitle className="text-sm font-medium">{title}</CardTitle>
                </div>
                <Badge variant={config.variant}>
                    <span className="flex items-center gap-1">
                        <StatusIcon className="h-3 w-3" />
                        {config.label}
                    </span>
                </Badge>
            </CardHeader>

            <CardContent>
                {description && <p className="text-sm text-muted-foreground mb-2">{description}</p>}
                {lastChecked && (
                    <p className="text-xs text-muted-foreground">Last checked: {lastChecked}</p>
                )}
            </CardContent>
        </Card>
    );
}
