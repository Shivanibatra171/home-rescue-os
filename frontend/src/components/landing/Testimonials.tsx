    import { motion } from 'framer-motion';
    import { Quote } from 'lucide-react';
    import { RatingStars } from '@/components/ui/RatingStars';
    import { dummyTestimonials } from '@/data/dummyTestimonials';

    export function Testimonials() {
    return (
        <section className="bg-surface-50 dark:bg-surface-950 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
                Testimonials
            </span>
            <h2 className="mt-2 font-display text-3xl font-bold text-surface-900 dark:text-surface-50 sm:text-4xl">
                Loved by homeowners across Pakistan
            </h2>
            </div>

            <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {dummyTestimonials.map((t, idx) => (
                <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="flex flex-col rounded-2xl border border-surface-100 dark:border-surface-800 bg-white dark:bg-surface-900 p-6 card-hover"
                >
                <Quote size={22} className="text-brand-200 dark:text-brand-800" />
                <p className="mt-3 flex-1 text-sm text-surface-600 dark:text-surface-300">"{t.comment}"</p>
                <div className="mt-5 flex items-center gap-3">
                    <img src={t.avatar} alt={t.name} className="h-10 w-10 rounded-full object-cover" />
                    <div>
                    <p className="text-sm font-semibold text-surface-900 dark:text-surface-50">{t.name}</p>
                    <p className="text-xs text-surface-400">{t.role} · {t.city}</p>
                    </div>
                </div>
                <div className="mt-3">
                    <RatingStars rating={t.rating} size={14} showValue={false} />
                </div>
                </motion.div>
            ))}
            </div>
        </div>
        </section>
    );
    }