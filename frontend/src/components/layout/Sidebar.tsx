    import { NavLink } from 'react-router-dom';
    import { type LucideIcon } from 'lucide-react';
    import { cn } from '@/utils/cn';

    export interface SidebarLink {
    label: string;
    to: string;
    icon: LucideIcon;
    badge?: number;
    }

    export function Sidebar({ links, footer }: { links: SidebarLink[]; footer?: React.ReactNode }) {
    return (
        <aside className="hidden w-64 shrink-0 flex-col border-r border-surface-100 dark:border-surface-800 bg-white dark:bg-surface-900 lg:flex">
        <nav className="flex-1 space-y-1 p-4">
            {links.map((link) => (
            <NavLink
                key={link.to}
                to={link.to}
                end
                className={({ isActive }) =>
                cn(
                    'flex items-center justify-between rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors',
                    isActive
                    ? 'bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-400'
                    : 'text-surface-600 dark:text-surface-300 hover:bg-surface-50 dark:hover:bg-surface-800'
                )
                }
            >
                <span className="flex items-center gap-3">
                <link.icon size={18} />
                {link.label}
                </span>
                {!!link.badge && (
                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-accent-500 px-1.5 text-[10px] font-bold text-white">
                    {link.badge}
                </span>
                )}
            </NavLink>
            ))}
        </nav>
        {footer && <div className="border-t border-surface-100 dark:border-surface-800 p-4">{footer}</div>}
        </aside>
    );
    }