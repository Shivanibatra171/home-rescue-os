    import { motion } from 'framer-motion';
    import { Camera, Search, CalendarCheck, ThumbsUp } from 'lucide-react';

    const steps = [
    { icon: Camera, title: 'Describe & Upload', desc: 'Tell us the problem and upload a photo so we match the right skill.' },
    { icon: Search, title: 'Get Matched', desc: 'We find verified, available pros near your location instantly.' },
    { icon: CalendarCheck, title: 'Book a Time', desc: 'Pick a date and time that works for you — fixed pricing, no surprises.' },
    { icon: ThumbsUp, title: 'Job Done', desc: 'Pro arrives, fixes it, and you rate the experience. Warranty included.' },
    ];

    export function HowItWorks() {
    return (
        <section className="bg-surface-50 dark:bg-surface-950 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
                How It Works
            </span>
            <h2 className="mt-2 font-display text-3xl font-bold text-surface-900 dark:text-surface-50 sm:text-4xl">
                From broken to fixed in four steps
            </h2>
            </div>

            <div className="relative mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="absolute left-0 right-0 top-8 hidden h-px bg-surface-200 dark:bg-surface-800 lg:block" />
            {steps.map((step, idx) => (
                <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="relative flex flex-col items-center text-center"
                >
                <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-2xl gradient-brand text-white shadow-soft">
                    <step.icon size={26} />
                </div>
                <span className="mt-4 flex h-6 w-6 items-center justify-center rounded-full bg-surface-900 dark:bg-surface-100 text-xs font-bold text-white dark:text-surface-900">
                    {idx + 1}
                </span>
                <h3 className="mt-3 font-display font-semibold text-surface-900 dark:text-surface-50">{step.title}</h3>
                <p className="mt-2 max-w-[220px] text-sm text-surface-500 dark:text-surface-400">{step.desc}</p>
                </motion.div>
            ))}
            </div>
        </div>
        </section>
    );
    }