import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Briefcase,
  Settings,
  Terminal,
  ChevronRight,
} from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Jobs', href: '/jobs', icon: Briefcase },
  { name: 'Automation', href: '/automation', icon: Terminal },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export function Sidebar() {
  const location = useLocation();

  return (
    <div className="flex h-full flex-col bg-white dark:bg-gray-900 border-r dark:border-gray-800">
      <div className="flex h-16 items-center justify-between px-4 border-b dark:border-gray-800">
        <div className="flex items-center gap-2">
          <ChevronRight className="h-6 w-6 text-blue-600" />
          <span className="font-semibold text-lg">Energy Manager</span>
        </div>
        <ThemeToggle />
      </div>
      <nav className="flex-1 space-y-1 px-2 py-4">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                'group flex items-center px-2 py-2 text-sm font-medium rounded-md',
                isActive
                  ? 'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-white'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white'
              )}
            >
              <item.icon
                className={cn(
                  'mr-3 h-5 w-5',
                  isActive
                    ? 'text-gray-500 dark:text-gray-300'
                    : 'text-gray-400 group-hover:text-gray-500 dark:group-hover:text-gray-300'
                )}
              />
              {item.name}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}