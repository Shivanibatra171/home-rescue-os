    import type { ReactNode } from 'react';
    import { AnimatePresence, motion } from 'framer-motion';
    import { X } from 'lucide-react';
    import { createPortal } from 'react-dom';

    export function Modal({
    isOpen,
    onClose,
    title,
    children,
    maxWidth = 'max-w-md',
    }: {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: ReactNode;
    maxWidth?: string;
    }) {
    if (typeof document === 'undefined') return null;

    return createPortal(
        <AnimatePresence>
        {isOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="absolute inset-0 bg-surface-950/50 backdrop-blur-sm"
            />
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                transition={{ duration: 0.2 }}
                className={`relative z-10 w-full ${maxWidth} rounded-2xl bg-white dark:bg-surface-900 shadow-[var(--shadow-elevated)] max-h-[90vh] overflow-y-auto`}
            >
                {title && (
                <div className="flex items-center justify-between border-b border-surface-100 dark:border-surface-800 p-5">
                    <h3 className="font-display text-lg font-semibold text-surface-900 dark:text-surface-50">{title}</h3>
                    <button onClick={onClose} className="rounded-lg p-1.5 text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-800 focus-ring">
                    <X size={18} />
                    </button>
                </div>
                )}
                <div className="p-5">{children}</div>
            </motion.div>
            </div>
        )}
        </AnimatePresence>,
        document.body
    );
    }