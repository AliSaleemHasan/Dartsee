import { Target, Bell, Settings, User } from 'lucide-react';
import { Button } from './ui/button';

export function Header() {
  return (
    <header className="bg-card border-b border-border">
      <div className="px-8 py-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#2A2A2A] border border-border flex items-center justify-center shrink-0">
              <Target className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl text-white">Dartsee</h1>
              <p className="text-muted-foreground text-sm">Analytics Dashboard</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="size-10 rounded-lg border border-border text-muted-foreground hover:text-white hover:border-[#444] hover:bg-transparent"
            >
              <Bell className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="size-10 rounded-lg border border-border text-muted-foreground hover:text-white hover:border-[#444] hover:bg-transparent"
            >
              <Settings className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="size-10 rounded-lg border border-border text-muted-foreground hover:text-white hover:border-[#444] hover:bg-transparent"
            >
              <User className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
