import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import {
  Wrench, Zap, Snowflake, Hammer, PaintBucket, Flame, WashingMachine, Sparkles, Home, Siren,
} from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { EmptyState } from '@/components/ui/EmptyState';
import { dummyCategories } from '@/data/dummyCategories';
import { formatCurrency } from '@/utils/formatCurrency';

const iconMap: Record<string, React.ElementType> = {
  Wrench, Zap, Snowflake, Hammer, PaintBucket, Flame, WashingMachine, Sparkles, Home, Siren,
};

export default function Services() {
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    return dummyCategories.filter((c) => c.name.toLowerCase().includes(search.toLowerCase()));
  }, [search]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center text-center">
        <span className="text-sm font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
          All Services
        </span>
        <h1 className="mt-2 font-display text-3xl font-bold text-surface-900 dark:text-surface-50 sm:text-4xl">
          Every home service, in one place
        </h1>
        <p className="mt-3 max-w-xl text-surface-500 dark:text-surface-400">
          Browse verified professionals across every category, from plumbing to emergency repairs.
        </p>

        <div className="mt-8 w-full max-w-md">
          <Input
            placeholder="Search a service..."
            leftIcon={<Search size={16} />}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="mt-14">
          <EmptyState
            title="No services found"
            message="Try searching for a different keyword, like 'plumber' or 'AC'."
          />
        </div>
      ) : (
        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((category, idx) => {
            const Icon = iconMap[category.icon] ?? Home;
            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.04 }}
              >
                <Link
                  to={`/services/${category.slug}`}
                  className="group flex items-start gap-4 rounded-2xl border border-surface-100 dark:border-surface-800 bg-white dark:bg-surface-900 p-6 card-hover"
                >
                  <div
                    className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl transition-transform group-hover:scale-110"
                    style={{ backgroundColor: `${category.color}18`, color: category.color }}
                  >
                    <Icon size={24} />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-surface-900 dark:text-surface-50">{category.name}</h3>
                    <p className="mt-1 text-sm text-surface-500 dark:text-surface-400">{category.description}</p>
                    <div className="mt-3 flex items-center gap-3 text-xs">
                      <span className="font-medium text-surface-400">{category.workerCount} pros available</span>
                      <span className="font-semibold text-brand-600 dark:text-brand-400">From {formatCurrency(category.startingPrice)}</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}