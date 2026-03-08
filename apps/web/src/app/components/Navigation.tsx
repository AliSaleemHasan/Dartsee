import { Link, useLocation } from 'react-router';
import { List, BarChart3, Info } from 'lucide-react';
import { Button } from './ui/button';

const navItems = [
  { path: '/', label: 'Games', icon: List },
  { path: '/statistics', label: 'Statistics', icon: BarChart3 },
  { path: '/about', label: 'About', icon: Info },
];

export function Navigation() {
  const location = useLocation();

  return (
    <nav className="bg-card border-b border-border">
      <div className="px-8 py-3">
        <div className="flex items-center gap-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <Button
                key={item.path}
                variant="ghost"
                asChild
                className={
                  isActive
                    ? 'rounded-lg border border-[#555] bg-[#2A2A2A] text-foreground hover:bg-[#2A2A2A] hover:text-foreground'
                    : 'rounded-lg border border-transparent text-muted-foreground hover:border-border hover:text-foreground hover:bg-transparent'
                }
              >
                <Link to={item.path}>
                  <Icon className="w-4 h-4" />
                  {item.label}
                </Link>
              </Button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
