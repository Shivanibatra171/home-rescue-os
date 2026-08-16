    import { motion } from 'framer-motion';
    import { Link } from 'react-router-dom';
    import {
    Wrench, Zap, Snowflake, Hammer, PaintBucket, Flame, WashingMachine, Sparkles, Home, Siren, ArrowRight,
    } from 'lucide-react';
    import { dummyCategories } from '@/data/dummyCategories';
    import { formatCurrency } from '@/utils/formatCurrency';

    const iconMap: Record<string, React.ElementType> = {
    Wrench, Zap, Snowflake, Hammer, PaintBucket, Flame, WashingMachine, Sparkles, Home, Siren,
    };

    export function PopularCategories() {
    return (
        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
            Our Services
            </span>
            <h2 className="mt-2 font-display text-3xl font-bold text-surface-900 dark:text-surface-50 sm:text-4xl">
            Whatever broke, we've got a pro for it
            </h2>
            <p className="mt-3 max-w-xl text-surface-500 dark:text-surface-400">
            From leaking taps to emergency repairs — browse our most requested service categories.
            </p>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {dummyCategories.map((category, idx) => {
            const Icon = iconMap[category.icon] ?? Home;
            return (
                <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                >
                <Link
                    to={`/services/${category.slug}`}
                    className="group flex flex-col items-center gap-3 rounded-2xl border border-surface-100 dark:border-surface-800 bg-white dark:bg-surface-900 p-5 text-center card-hover"
                >
                    <div
                    className="flex h-14 w-14 items-center justify-center rounded-2xl transition-transform group-hover:scale-110"
                    style={{ backgroundColor: `${category.color}18`, color: category.color }}
                    >
                    <Icon size={26} />
                    </div>
                    <div>
                    <h3 className="font-display text-sm font-semibold text-surface-900 dark:text-surface-50">{category.name}</h3>
                    <p className="mt-0.5 text-xs text-surface-400">{category.workerCount} pros</p>
                    <p className="mt-1 text-xs font-medium text-brand-600 dark:text-brand-400">From {formatCurrency(category.startingPrice)}</p>
                    </div>
                </Link>
                </motion.div>
            );
            })}
        </div>

        <div className="mt-10 flex justify-center">
            <Link to="/services" className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 dark:text-brand-400 hover:gap-2.5 transition-all">
            View all services <ArrowRight size={16} />
            </Link>
        </div>
        </section>
    );
    }