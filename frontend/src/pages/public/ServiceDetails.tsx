import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Wrench, Zap, Snowflake, Hammer, PaintBucket, Flame, WashingMachine, Sparkles, Home, Siren,
  ShieldCheck, ArrowRight,
} from 'lucide-react';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { Button } from '@/components/ui/Button';
import { WorkerCard } from '@/components/worker/WorkerCard';
import { EmptyState } from '@/components/ui/EmptyState';
import { dummyCategories } from '@/data/dummyCategories';
import { dummyWorkers } from '@/data/dummyWorkers';
import { formatCurrency } from '@/utils/formatCurrency';
import { ROUTES } from '@/utils/constants';

const iconMap: Record<string, React.ElementType> = {
  Wrench, Zap, Snowflake, Hammer, PaintBucket, Flame, WashingMachine, Sparkles, Home, Siren,
};

export default function ServiceDetails() {
  const { slug } = useParams<{ slug: string }>();
  const category = dummyCategories.find((c) => c.slug === slug);
  const workers = dummyWorkers.filter((w) => w.categories.includes(slug ?? ''));

  if (!category) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20">
        <EmptyState title="Service not found" message="This service category doesn't exist or was removed." />
      </div>
    );
  }

  const Icon = iconMap[category.icon] ?? Home;

  return (
    <div>
      <section className="border-b border-surface-100 dark:border-surface-800 bg-surface-50 dark:bg-surface-950 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: 'Services', to: ROUTES.SERVICES }, { label: category.name }]} />

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mt-6 flex flex-col items-start gap-6 sm:flex-row sm:items-center"
          >
            <div
              className="flex h-20 w-20 shrink-0 items-center justify-center rounded-3xl"
              style={{ backgroundColor: `${category.color}18`, color: category.color }}
            >
              <Icon size={36} />
            </div>
            <div className="flex-1">
              <h1 className="font-display text-3xl font-bold text-surface-900 dark:text-surface-50">{category.name}</h1>
              <p className="mt-2 max-w-xl text-surface-500 dark:text-surface-400">{category.description}</p>
              <div className="mt-4 flex flex-wrap items-center gap-4 text-sm">
                <span className="flex items-center gap-1.5 text-surface-500 dark:text-surface-400">
                  <ShieldCheck size={15} className="text-brand-500" /> {category.workerCount} verified pros
                </span>
                <span className="font-semibold text-brand-600 dark:text-brand-400">
                  Packages starting {formatCurrency(category.startingPrice)}
                </span>
              </div>
            </div>
            <Link to={ROUTES.SEARCH_WORKERS}>
              <Button rightIcon={<ArrowRight size={16} />}>Find a Pro Now</Button>
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <h2 className="font-display text-xl font-bold text-surface-900 dark:text-surface-50">
          Available {category.name.toLowerCase()} professionals
        </h2>

        {workers.length === 0 ? (
          <div className="mt-8">
            <EmptyState
              title="No pros available right now"
              message="Check back soon, or browse other service categories."
            />
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {workers.map((worker, idx) => (
              <motion.div
                key={worker.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.06 }}
              >
                <WorkerCard worker={worker} />
              </motion.div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}