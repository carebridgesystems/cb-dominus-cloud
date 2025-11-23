import { Shield, Megaphone, Radio, Crown, Users } from 'lucide-react';
import { StatusCard, ServiceStatus } from '@/components/status-card';

// Fake service data
const services = [
    {
        title: 'Warden',
        status: 'ok' as ServiceStatus,
        description: 'Secrets management',
        icon: <Shield className="h-5 w-5 text-muted-foreground" />,
        lastChecked: '2s ago'
    },
    {
        title: 'Herald',
        status: 'ok' as ServiceStatus,
        description: 'Logging & events',
        icon: <Megaphone className="h-5 w-5 text-muted-foreground" />,
        lastChecked: '5s ago'
    },
    {
        title: 'Whisperer',
        status: 'warn' as ServiceStatus,
        description: 'Cache layer',
        icon: <Radio className="h-5 w-5 text-muted-foreground" />,
        lastChecked: '10s ago'
    },
    {
        title: 'Sovereign',
        status: 'ok' as ServiceStatus,
        description: 'Authentication',
        icon: <Crown className="h-5 w-5 text-muted-foreground" />,
        lastChecked: '3s ago'
    },
    {
        title: 'Conductor',
        status: 'error' as ServiceStatus,
        description: 'Agent orchestration',
        icon: <Users className="h-5 w-5 text-muted-foreground" />,
        lastChecked: '1m ago'
    }
];

/**
 * Dashboard home page
 */
export default function DashboardPage() {
    return (
        <div className='flex flex-1 flex-col gap-4 p-4'>
            <h1 className='text-2xl font-semibold'>Dashboard</h1>

            <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
                {services.map((service) => (
                    <StatusCard key={service.title} {...service} />
                ))}
            </div>
        </div>
    );
}

