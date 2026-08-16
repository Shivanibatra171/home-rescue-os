    import { Link } from 'react-router-dom';
    import { ChevronRight, Home } from 'lucide-react';

    export function Breadcrumb({ items }: { items: { label: string; to?: string }[] }) {
    return (
        <nav className="flex items-center gap-2 text-sm text-surface-500 dark:text-surface-400">
        <Link to="/" className="flex items-center hover:text-brand-600">
            <Home size={14} />
        </Link>
        {items.map((item, idx) => (
            <span key={idx} className="flex items-center gap-2">
            <ChevronRight size={14} />
            {item.to ? (
                <Link to={item.to} className="hover:text-brand-600">{item.label}</Link>
            ) : (
                <span className="font-medium text-surface-800 dark:text-surface-100">{item.label}</span>
            )}
            </span>
        ))}
        </nav>
    );
    }