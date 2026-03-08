import { Link, useRouteError } from 'react-router';
import { XCircle } from 'lucide-react';
import { Button } from '../components/ui/button';
import { PageShell } from '../components/shared/PageShell';

export default function GlobalError() {
    const error = useRouteError() as any;
    const is404 = error?.status === 404;

    if (is404) {
        // If router natively caught a 404, we can redirect or show the NotFound UI.
        // However, it's usually better to have the NotFound component handle explicit 404 catch-alls.
    }

    return (
        <PageShell>
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6">
                <div className="w-20 h-20 rounded-full bg-destructive/10 flex items-center justify-center mb-4">
                    <XCircle className="w-10 h-10 text-destructive" />
                </div>
                <h1 className="text-4xl font-bold tracking-tight text-foreground">
                    {is404 ? "404 - Not Found" : "Unexpected Application Error"}
                </h1>
                <p className="text-muted-foreground max-w-md">
                    {is404 ? "We couldn't find what you were looking for." : error?.message || "Something went wrong. An unexpected error has occurred."}
                </p>
                <div className="flex gap-4 mt-8">
                    <Button onClick={() => window.location.reload()} variant="outline">
                        Refresh Page
                    </Button>
                    <Button asChild>
                        <Link to="/">Back to Home</Link>
                    </Button>
                </div>
            </div>
        </PageShell>
    );
}
