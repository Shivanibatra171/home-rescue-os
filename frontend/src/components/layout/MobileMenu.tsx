    import { useState } from 'react';
    import { NavLink } from 'react-router-dom';
    import { motion, AnimatePresence } from 'framer-motion';
    import { Menu, X, type LucideIcon } from 'lucide-react';
    import { cn } from '@/utils/cn';

    interface MobileMenuLink {
    label: string;
    to: string;
    icon: LucideIcon;
    }

    export function MobileMenu({ links, title }: { links: MobileMenuLink[]; title: string }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="lg:hidden">
        <button
            onClick={() => setIsOpen(true)}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-surface-200 dark:border-surface-700 text-surface-700 dark:text-surface-200"
        >
            <Menu size={20} />
        </button>

        <AnimatePresence>
            {isOpen && (
            <>
                <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsOpen(false)}
                className="fixed inset-0 z-50 bg-surface-950/50 backdrop-blur-sm"
                />
                <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ type: 'tween', duration: 0.25 }}
                className="fixed left-0 top-0 z-50 h-full w-72 bg-white dark:bg-surface-900 p-5 shadow-[var(--shadow-elevated)]"
                >
                <div className="flex items-center justify-between">
                    <span className="font-display font-bold text-surface-900 dark:text-surface-50">{title}</span>
                    <button onClick={() => setIsOpen(false)} className="rounded-lg p-1.5 text-surface-500 hover:bg-surface-100 dark:hover:bg-surface-800">
                    <X size={20} />
                    </button>
                </div>
                <nav className="mt-6 space-y-1">
                    {links.map((link) => (
                    <NavLink
                        key={link.to}
                        to={link.to}
                        end
                        onClick={() => setIsOpen(false)}
                        className={({ isActive }) =>
                        cn(
                            'flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium',
                            isActive
                            ? 'bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-400'
                            : 'text-surface-600 dark:text-surface-300'
                        )
                        }
                    >
                        <link.icon size={18} />
                        {link.label}
                    </NavLink>
                    ))}
                </nav>
                </motion.div>
            </>
            )}
        </AnimatePresence>
        </div>
    );
    }