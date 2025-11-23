import { Shield, Megaphone, Radio, Crown, Users } from 'lucide-react';
import { StatusCard, ServiceStatus } from '@/components/status-card';

/**
 * Fetch sovereign health status
 */
async function checkSovereignHealth(): Promise<ServiceStatus> {
    try {
        const response = await fetch('https://sovereign-cloud-development-775398158805.us-east4.run.app/health', {
            cache: 'no-store', // Don't cache health checks
            signal: AbortSignal.timeout(5000) // 5 second timeout
        });

        if (!response.ok) {
            return 'error';
        }

        const data = await response.json();
        return data.status === 'ok' ? 'ok' : 'error';
    } catch (error) {
        console.error('Failed to fetch sovereign health:', error);
        return 'error';
    }
}

/**
 * Dashboard home page
 */
export default async function DashboardPage() {
    // Fetch real sovereign health status
    const sovereignStatus = await checkSovereignHealth();

    // Fake service data (will be replaced with real checks later)
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
            status: sovereignStatus, // Real health check!
            description: 'Authentication',
            icon: <Crown className="h-5 w-5 text-muted-foreground" />,
            lastChecked: 'just now'
        },
        {
            title: 'Conductor',
            status: 'error' as ServiceStatus,
            description: 'Agent orchestration',
            icon: <Users className="h-5 w-5 text-muted-foreground" />,
            lastChecked: '1m ago'
        }
    ];

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

