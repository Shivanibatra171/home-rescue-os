    import { Moon, Sun } from 'lucide-react';
    import { motion } from 'framer-motion';
    import { useTheme } from '@/hooks/useTheme';

    export function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
        onClick={toggleTheme}
        aria-label="Toggle theme"
        className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-surface-200 dark:border-surface-700 text-surface-600 dark:text-surface-300 hover:bg-surface-50 dark:hover:bg-surface-800 focus-ring"
        >
        <motion.div
            key={theme}
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            transition={{ duration: 0.25 }}
        >
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
        </motion.div>
        </button>
    );
    }