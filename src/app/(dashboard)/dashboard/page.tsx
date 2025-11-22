/**
 * Dashboard home page
 * Will display overview cards and recent activity
 */
export default function DashboardPage() {
    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-lg border p-6">
                    <h3 className="text-sm font-medium text-muted-foreground">Projects</h3>
                    <p className="text-2xl font-bold mt-2">-</p>
                </div>
                <div className="rounded-lg border p-6">
                    <h3 className="text-sm font-medium text-muted-foreground">Secrets</h3>
                    <p className="text-2xl font-bold mt-2">-</p>
                </div>
                <div className="rounded-lg border p-6">
                    <h3 className="text-sm font-medium text-muted-foreground">Services</h3>
                    <p className="text-2xl font-bold mt-2">-</p>
                </div>
                <div className="rounded-lg border p-6">
                    <h3 className="text-sm font-medium text-muted-foreground">Status</h3>
                    <p className="text-2xl font-bold mt-2">-</p>
                </div>
            </div>
        </div>
    );
}

