    import { useState } from 'react';
    import { useNavigate } from 'react-router-dom';
    import { Search, MapPin } from 'lucide-react';
    import { Button } from '@/components/ui/Button';
    import { dummyCategories } from '@/data/dummyCategories';

    export function SearchBar() {
    const navigate = useNavigate();
    const [query, setQuery] = useState('');
    const [city, setCity] = useState('Karachi');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        navigate(`/dashboard/search?q=${encodeURIComponent(query)}&city=${encodeURIComponent(city)}`);
    };

    return (
        <form
        onSubmit={handleSearch}
        className="flex flex-col gap-2 rounded-2xl bg-white/95 dark:bg-surface-900/95 backdrop-blur-xl p-2 shadow-[var(--shadow-elevated)] sm:flex-row sm:items-center"
        >
        <div className="flex flex-1 items-center gap-2 px-3">
            <Search size={18} className="shrink-0 text-surface-400" />
            <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="What's broken? e.g. leaking tap, AC not cooling..."
            list="category-suggestions"
            className="h-12 w-full bg-transparent text-sm text-surface-900 dark:text-surface-50 placeholder:text-surface-400 focus:outline-none"
            />
            <datalist id="category-suggestions">
            {dummyCategories.map((c) => (
                <option key={c.id} value={c.name} />
            ))}
            </datalist>
        </div>
        <div className="hidden h-8 w-px bg-surface-200 dark:bg-surface-700 sm:block" />
        <div className="flex items-center gap-2 px-3 sm:border-none border-t border-surface-100 dark:border-surface-800 pt-2 sm:pt-0">
            <MapPin size={16} className="shrink-0 text-surface-400" />
            <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="h-12 bg-transparent text-sm font-medium text-surface-700 dark:text-surface-300 focus:outline-none"
            >
            <option>Karachi</option>
            <option>Lahore</option>
            <option>Islamabad</option>
            </select>
        </div>
        <Button type="submit" size="lg" className="w-full sm:w-auto">
            Find a Pro
        </Button>
        </form>
    );
    }