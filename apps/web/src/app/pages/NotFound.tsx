import { Link } from 'react-router';
import { Target } from 'lucide-react';
import { Button } from '../components/ui/button';
import { PageShell } from '../components/shared/PageShell';

export default function NotFound() {
    return (
        <PageShell>
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6">
                <div className="w-20 h-20 rounded-full bg-destructive/10 flex items-center justify-center mb-4">
                    <Target className="w-10 h-10 text-destructive" />
                </div>
                <h1 className="text-4xl font-bold tracking-tight text-foreground">404 - Missed the Board!</h1>
                <p className="text-muted-foreground max-w-md">
                    The page you are looking for doesn't exist or has been moved. Let's get you back to the game.
                </p>
                <Button asChild size="lg" className="mt-8">
                    <Link to="/">Return Dashboard</Link>
                </Button>
            </div>
        </PageShell>
    );
}
