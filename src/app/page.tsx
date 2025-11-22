import { redirect } from 'next/navigation';

/**
 * Root page - redirects to dashboard
 * Once authentication is set up, this will check auth status first
 */
export default function HomePage() {
    redirect('/dashboard');
}
