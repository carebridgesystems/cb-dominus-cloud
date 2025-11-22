/**
 * Login page
 * Will be integrated with Better Auth in Phase 3
 */
export default function LoginPage() {
    return (
        <div className="flex min-h-screen items-center justify-center">
            <div className="w-full max-w-md space-y-8 p-8">
                <div className="text-center">
                    <h1 className="text-3xl font-bold">Dominus Cloud</h1>
                    <p className="mt-2 text-muted-foreground">
                        Admin Orchestrator for CareBridge Systems
                    </p>
                </div>
                <div className="rounded-lg border p-6">
                    <h2 className="text-xl font-semibold mb-4">Sign In</h2>
                    <p className="text-sm text-muted-foreground">
                        Authentication will be implemented in Phase 3
                    </p>
                </div>
            </div>
        </div>
    );
}

