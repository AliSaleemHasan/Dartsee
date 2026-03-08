import { Link } from 'react-router';
import { ArrowLeft } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';

interface GameDetailHeaderProps {
    gameId: number;
    gameType: string;
    playerCount: number;
}

export function GameDetailHeader({ gameId, gameType, playerCount }: GameDetailHeaderProps) {
    return (
        <>
            <Button
                variant="ghost"
                asChild
                className="mb-6 pl-0 text-muted-foreground hover:text-foreground hover:bg-transparent gap-2"
            >
                <Link to="/games">
                    <ArrowLeft className="w-4 h-4" />
                    Back to Games
                </Link>
            </Button>

            <div className="mb-8 flex items-center gap-3 flex-wrap">
                <h2 className="text-foreground">Game #{gameId}</h2>
                <Badge variant="outline" className="text-muted-foreground">
                    {gameType}
                </Badge>
                <p className="text-muted-foreground text-sm">{playerCount} players</p>
            </div>
        </>
    );
}
