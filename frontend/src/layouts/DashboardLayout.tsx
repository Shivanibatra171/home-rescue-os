    import { Outlet } from 'react-router-dom';
    import { Sidebar, type SidebarLink } from '@/components/layout/Sidebar';
    import { MobileMenu } from '@/components/layout/MobileMenu';
    import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
    import { Home as HomeIcon } from 'lucide-react';
    import { Link } from 'react-router-dom';
    import { ROUTES } from '@/utils/constants';

    export function DashboardLayout({
    links,
    notificationsLink,
    unreadCount,
    panelTitle,
    }: {
    links: SidebarLink[];
    notificationsLink: string;
    unreadCount?: number;
    panelTitle: string;
    }) {
    return (
        <div className="flex min-h-screen bg-surface-50 dark:bg-surface-950">
        <div className="hidden lg:flex lg:w-64 lg:shrink-0 lg:flex-col">
            <div className="flex h-16 items-center gap-2 border-b border-r border-surface-100 dark:border-surface-800 bg-white dark:bg-surface-900 px-5">
            <Link to={ROUTES.HOME} className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-brand text-white">
                <HomeIcon size={16} />
                </div>
                <span className="font-display text-sm font-bold text-surface-900 dark:text-surface-50">{panelTitle}</span>
            </Link>
            </div>
            <Sidebar links={links} />
        </div>

        <div className="flex flex-1 flex-col min-w-0">
            <DashboardHeader
            notificationsLink={notificationsLink}
            unreadCount={unreadCount}
            mobileMenu={<MobileMenu title={panelTitle} links={links} />}
            />
            <main className="flex-1 p-4 sm:p-6">
            <Outlet />
            </main>
        </div>
        </div>
    );
    }