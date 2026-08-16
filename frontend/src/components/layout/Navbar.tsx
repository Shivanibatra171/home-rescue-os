    import { useState } from 'react';
    import { Link, NavLink } from 'react-router-dom';
    import { motion, AnimatePresence } from 'framer-motion';
    import { Menu, X, Bell, Home as HomeIcon } from 'lucide-react';
    import { ThemeToggle } from '@/components/ui/ThemeToggle';
    import { Button } from '@/components/ui/Button';
    import { useAuth } from '@/hooks/useAuth';
    import { cn } from '@/utils/cn';
    import { ROUTES } from '@/utils/constants';

    const navLinks = [
    { label: 'Home', to: ROUTES.HOME },
    { label: 'Services', to: ROUTES.SERVICES },
    { label: 'About', to: ROUTES.ABOUT },
    { label: 'Contact', to: ROUTES.CONTACT },
    ];

    export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const { isAuthenticated, user } = useAuth();

    return (
        <header className="sticky top-0 z-40 glass">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
            <Link to={ROUTES.HOME} className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl gradient-brand text-white">
                <HomeIcon size={18} />
            </div>
            <span className="font-display text-lg font-bold text-surface-900 dark:text-surface-50">
                Home Rescue <span className="gradient-text">OS</span>
            </span>
            </Link>

            <nav className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
                <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                    cn(
                    'rounded-lg px-4 py-2 text-sm font-medium transition-colors',
                    isActive
                        ? 'text-brand-600 dark:text-brand-400'
                        : 'text-surface-600 dark:text-surface-300 hover:text-brand-600 dark:hover:text-brand-400'
                    )
                }
                >
                {link.label}
                </NavLink>
            ))}
            </nav>

            <div className="hidden items-center gap-3 md:flex">
            <ThemeToggle />
            {isAuthenticated ? (
                <Link to={user?.role === 'admin' ? ROUTES.ADMIN_DASHBOARD : (user?.role === 'worker' ? ROUTES.WORKER_DASHBOARD : ROUTES.USER_DASHBOARD)}>
                <div className="flex items-center gap-2 rounded-xl border border-surface-200 dark:border-surface-700 py-1.5 pl-1.5 pr-3">
                    <img src={user?.avatar || 'https://i.pravatar.cc/150?img=47'} alt={user?.name} className="h-7 w-7 rounded-full object-cover" />
                    <span className="text-sm font-medium text-surface-800 dark:text-surface-100">{user?.name ? user.name.split(' ')[0] : 'Profile'}</span>
                </div>
                </Link>
            ) : (
                <>
                <Link to={ROUTES.USER_LOGIN}>
                    <Button variant="ghost" size="sm">Log in</Button>
                </Link>
                <Link to={ROUTES.USER_REGISTER}>
                    <Button size="sm">Get Started</Button>
                </Link>
                </>
            )}
            </div>

            <button
            className="flex h-10 w-10 items-center justify-center rounded-lg text-surface-700 dark:text-surface-200 md:hidden"
            onClick={() => setIsOpen(true)}
            aria-label="Open menu"
            >
            <Menu size={22} />
            </button>
        </div>

        <AnimatePresence>
            {isOpen && (
            <>
                <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 bg-surface-950/50 backdrop-blur-sm md:hidden"
                onClick={() => setIsOpen(false)}
                />
                <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'tween', duration: 0.25 }}
                className="fixed right-0 top-0 z-50 h-full w-72 bg-white dark:bg-surface-900 p-6 shadow-[var(--shadow-elevated)] md:hidden"
                >
                <div className="flex items-center justify-between">
                    <span className="font-display font-bold text-surface-900 dark:text-surface-50">Menu</span>
                    <button onClick={() => setIsOpen(false)} className="rounded-lg p-1.5 text-surface-500 hover:bg-surface-100 dark:hover:bg-surface-800">
                    <X size={20} />
                    </button>
                </div>
                <nav className="mt-6 flex flex-col gap-1">
                    {navLinks.map((link) => (
                    <NavLink
                        key={link.to}
                        to={link.to}
                        onClick={() => setIsOpen(false)}
                        className={({ isActive }) =>
                        cn(
                            'rounded-lg px-4 py-3 text-sm font-medium',
                            isActive ? 'bg-brand-50 text-brand-600 dark:bg-brand-950 dark:text-brand-400' : 'text-surface-700 dark:text-surface-300'
                        )
                        }
                    >
                        {link.label}
                    </NavLink>
                    ))}
                </nav>
                <div className="mt-6 flex flex-col gap-3 border-t border-surface-100 dark:border-surface-800 pt-6">
                    <div className="flex items-center justify-between">
                    <span className="text-sm text-surface-500">Theme</span>
                    <ThemeToggle />
                    </div>
                    {isAuthenticated ? (
                    <Link to={user?.role === 'admin' ? ROUTES.ADMIN_DASHBOARD : (user?.role === 'worker' ? ROUTES.WORKER_DASHBOARD : ROUTES.USER_DASHBOARD)}>
                        <Button className="w-full">
                        <Bell size={16} /> Dashboard
                        </Button>
                    </Link>
                    ) : (
                    <>
                        <Link to={ROUTES.USER_LOGIN} className="w-full">
                        <Button variant="outline" className="w-full">Log in</Button>
                        </Link>
                        <Link to={ROUTES.USER_REGISTER} className="w-full">
                        <Button className="w-full">Get Started</Button>
                        </Link>
                    </>
                    )}
                </div>
                </motion.div>
            </>
            )}
        </AnimatePresence>
        </header>
    );
    }