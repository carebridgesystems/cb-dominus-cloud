// Dominus development configuration from token_mappings.json
const SOVEREIGN_DEV_TOKEN = '1f9efd620db8f91dbb97d421c63a30664cc453b30895367bd107dadff7aaa5f4';
const SOVEREIGN_URL = 'https://sovereign-cloud-development-775398158805.us-east4.run.app';
const DOMINUS_PROJECT_ID = 'eee53992-e541-43c1-8147-5f7c310df805';

interface SovereignProject {
    project_id: string;
    project_name: string;
    environment: string;
    [key: string]: any;
}

/**
 * Base64 encode a string (matches Python's base64.b64encode)
 */
function base64Encode(str: string): string {
    return Buffer.from(str, 'utf-8').toString('base64');
}

/**
 * Base64 decode a string (matches Python's base64.b64decode)
 */
function base64Decode(str: string): string {
    return Buffer.from(str, 'base64').toString('utf-8');
}

/**
 * Fetch project information from Sovereign
 * Uses base64 encoding for token and request/response bodies
 */
async function getProjectInfo(): Promise<SovereignProject | null> {
    try {
        // Encode token for Authorization header
        const encodedToken = base64Encode(SOVEREIGN_DEV_TOKEN);

        // Encode request body
        const requestBody = JSON.stringify({ project_id: DOMINUS_PROJECT_ID });
        const encodedBody = base64Encode(requestBody);

        const response = await fetch(`${SOVEREIGN_URL}/api/projects/get`, {
            method: 'POST',
            headers: {
                'Content-Type': 'text/plain',
                'Authorization': `Bearer ${encodedToken}`
            },
            body: encodedBody,
            cache: 'no-store'
        });

        if (!response.ok) {
            console.error('Failed to fetch project info:', response.statusText);
            return null;
        }

        // Decode base64 response
        const encodedResponse = await response.text();
        const decodedResponse = base64Decode(encodedResponse);
        return JSON.parse(decodedResponse);
    } catch (error) {
        console.error('Error fetching project info:', error);
        return null;
    }
}

/**
 * Sovereign Management Page
 */
export default async function SovereignPage() {
    const projectInfo = await getProjectInfo();

    return (
        <div className='flex flex-1 flex-col gap-4 p-4'>
            <h1 className='text-2xl font-semibold'>Sovereign</h1>

            {projectInfo ? (
                <div className='rounded-lg border p-4'>
                    <h2 className='text-lg font-medium mb-2'>Project Information</h2>
                    <dl className='grid grid-cols-2 gap-2 text-sm'>
                        <dt className='font-medium'>Project ID:</dt>
                        <dd className='text-muted-foreground'>{projectInfo.project_id}</dd>

                        <dt className='font-medium'>Project Name:</dt>
                        <dd className='text-muted-foreground'>{projectInfo.project_name}</dd>

                        <dt className='font-medium'>Environment:</dt>
                        <dd className='text-muted-foreground'>{projectInfo.environment}</dd>
                    </dl>
                </div>
            ) : (
                <div className='rounded-lg border border-destructive/50 p-4'>
                    <p className='text-sm text-destructive'>Failed to load project information from Sovereign</p>
                </div>
            )}
        </div>
    );
}
