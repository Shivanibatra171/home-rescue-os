import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SlidersHorizontal, X } from 'lucide-react';
import { WorkerCard } from '@/components/worker/WorkerCard';
import { WorkerCardSkeletonUI } from '@/components/ui/Skeleton';
import { EmptyState } from '@/components/ui/EmptyState';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Pagination } from '@/components/ui/Pagination';
import { dummyWorkers } from '@/data/dummyWorkers';
import { dummyCategories } from '@/data/dummyCategories';
import { usePagination } from '@/hooks/usePagination';
import { useDebounce } from '@/hooks/useDebounce';
import { Search as SearchIcon } from 'lucide-react';

export default function SearchWorkers() {
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') ?? '');
  const [category, setCategory] = useState('');
  const [city, setCity] = useState(searchParams.get('city') ?? '');
  const [minRating, setMinRating] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [isLoading] = useState(false);

  const debouncedQuery = useDebounce(query, 300);

  const filtered = useMemo(() => {
    return dummyWorkers.filter((w) => {
      const matchesQuery =
        !debouncedQuery ||
        w.name.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
        w.primaryCategory.toLowerCase().includes(debouncedQuery.toLowerCase());
      const matchesCategory = !category || w.categories.includes(category);
      const matchesCity = !city || w.city === city;
      const matchesRating = !minRating || w.rating >= Number(minRating);
      return matchesQuery && matchesCategory && matchesCity && matchesRating;
    });
  }, [debouncedQuery, category, city, minRating]);

  const { page, totalPages, paginated, goToPage } = usePagination(filtered, 6);

  const clearFilters = () => {
    setCategory('');
    setCity('');
    setMinRating('');
  };

  const hasActiveFilters = category || city || minRating;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-surface-900 dark:text-surface-50">Find a professional</h1>
        <p className="mt-1 text-sm text-surface-500 dark:text-surface-400">Search and filter verified workers near you.</p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="flex-1">
          <Input
            placeholder="Search by name or skill..."
            leftIcon={<SearchIcon size={16} />}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <button
          onClick={() => setShowFilters((p) => !p)}
          className="flex items-center justify-center gap-2 rounded-xl border border-surface-200 dark:border-surface-700 px-4 py-2.5 text-sm font-medium text-surface-700 dark:text-surface-300 hover:bg-surface-50 dark:hover:bg-surface-800"
        >
          <SlidersHorizontal size={16} /> Filters
          {hasActiveFilters && <span className="h-2 w-2 rounded-full bg-brand-500" />}
        </button>
      </div>

      {showFilters && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="rounded-2xl border border-surface-100 dark:border-surface-800 bg-white dark:bg-surface-900 p-5"
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <Select
              label="Category"
              placeholder="All categories"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              options={dummyCategories.map((c) => ({ label: c.name, value: c.slug }))}
            />
            <Select
              label="City"
              placeholder="All cities"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              options={[{ label: 'Karachi', value: 'Karachi' }, { label: 'Lahore', value: 'Lahore' }, { label: 'Islamabad', value: 'Islamabad' }]}
            />
            <Select
              label="Minimum rating"
              placeholder="Any rating"
              value={minRating}
              onChange={(e) => setMinRating(e.target.value)}
              options={[{ label: '4.5+', value: '4.5' }, { label: '4.0+', value: '4.0' }, { label: '3.5+', value: '3.5' }]}
            />
          </div>
          {hasActiveFilters && (
            <button onClick={clearFilters} className="mt-4 flex items-center gap-1 text-xs font-semibold text-surface-500 hover:text-red-500">
              <X size={13} /> Clear filters
            </button>
          )}
        </motion.div>
      )}

      {isLoading ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => <WorkerCardSkeletonUI key={i} />)}
        </div>
      ) : filtered.length === 0 ? (
        <EmptyState title="No workers found" message="Try adjusting your search or filters." actionLabel={hasActiveFilters ? 'Clear filters' : undefined} onAction={hasActiveFilters ? clearFilters : undefined} />
      ) : (
        <>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {paginated.map((worker) => <WorkerCard key={worker.id} worker={worker} />)}
          </div>
          <Pagination page={page} totalPages={totalPages} onPageChange={goToPage} />
        </>
      )}
    </div>
  );
}