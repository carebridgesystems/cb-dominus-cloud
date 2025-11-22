/**
 * Dashboard home page
 * Will display overview cards and recent activity
 */
export default function DashboardPage() {
    return (
        <div className='flex flex-1 flex-col gap-4 p-4'>
            <div className='grid auto-rows-min gap-4 md:grid-cols-2 lg:grid-cols-4'>
                <div className='rounded-lg border p-6'>
                    <h3 className='text-sm font-medium text-muted-foreground'>Projects</h3>
                    <p className='text-2xl font-bold mt-2'>-</p>
                </div>
                <div className='rounded-lg border p-6'>
                    <h3 className='text-sm font-medium text-muted-foreground'>Secrets</h3>
                    <p className='text-2xl font-bold mt-2'>-</p>
                </div>
                <div className='rounded-lg border p-6'>
                    <h3 className='text-sm font-medium text-muted-foreground'>Services</h3>
                    <p className='text-2xl font-bold mt-2'>-</p>
                </div>
                <div className='rounded-lg border p-6'>
                    <h3 className='text-sm font-medium text-muted-foreground'>Status</h3>
                    <p className='text-2xl font-bold mt-2'>-</p>
                </div>
            </div>
        </div>
    );
}

