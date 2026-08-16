    import { motion } from 'framer-motion';
    import { ShieldCheck, Tag, ImagePlus, Award, Siren, MessageCircle } from 'lucide-react';

    const features = [
    { icon: ShieldCheck, title: 'Verified Professionals', desc: 'Every worker is background-checked with valid ID and skill verification.' },
    { icon: Tag, title: 'Fixed-Price Packages', desc: 'Know the price before you book — no haggling, no surprise charges.' },
    { icon: ImagePlus, title: 'Photo-Based Matching', desc: 'Upload a photo of the issue so the right specialist is sent, first time.' },
    { icon: Award, title: 'Warranty Included', desc: 'Jobs completed through the platform come with a service warranty.' },
    { icon: Siren, title: 'Emergency Mode', desc: '24/7 priority matching for urgent home emergencies.' },
    { icon: MessageCircle, title: 'WhatsApp Booking', desc: 'Prefer chat? Book and track your service directly on WhatsApp.' },
    ];

    export function Features() {
    return (
        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
            Why Home Rescue OS
            </span>
            <h2 className="mt-2 font-display text-3xl font-bold text-surface-900 dark:text-surface-50 sm:text-4xl">
            Built for trust, not just convenience
            </h2>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, idx) => (
            <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="group rounded-2xl border border-surface-100 dark:border-surface-800 bg-white dark:bg-surface-900 p-6 card-hover"
            >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 dark:bg-brand-950 text-brand-600 dark:text-brand-400 transition-transform group-hover:scale-110">
                <feature.icon size={22} />
                </div>
                <h3 className="mt-4 font-display font-semibold text-surface-900 dark:text-surface-50">{feature.title}</h3>
                <p className="mt-2 text-sm text-surface-500 dark:text-surface-400">{feature.desc}</p>
            </motion.div>
            ))}
        </div>
        </section>
    );
    }