    import { Bell } from 'lucide-react';
    import { Link } from 'react-router-dom';
    import { ThemeToggle } from '@/components/ui/ThemeToggle';
    import { useAuth } from '@/hooks/useAuth';

    export function DashboardHeader({
    mobileMenu,
    notificationsLink,
    unreadCount = 0,
    }: {
    mobileMenu?: React.ReactNode;
    notificationsLink: string;
    unreadCount?: number;
    }) {
    const { user } = useAuth();

    return (
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-surface-100 dark:border-surface-800 bg-white/80 dark:bg-surface-900/80 backdrop-blur-xl px-4 sm:px-6">
        <div className="flex items-center gap-3">{mobileMenu}</div>
        <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link to={notificationsLink} className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-surface-200 dark:border-surface-700 text-surface-600 dark:text-surface-300 hover:bg-surface-50 dark:hover:bg-surface-800">
            <Bell size={18} />
            {unreadCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-accent-500 text-[9px] font-bold text-white">
                {unreadCount}
                </span>
            )}
            </Link>
            <img src={user?.avatar} alt={user?.name} className="h-9 w-9 rounded-full object-cover border border-surface-200 dark:border-surface-700" />
        </div>
        </header>
    );
    }