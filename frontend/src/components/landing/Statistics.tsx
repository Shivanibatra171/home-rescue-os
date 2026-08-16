    import { motion } from 'framer-motion';
    import { Users, Briefcase, Building2, Star } from 'lucide-react';

    const stats = [
    { icon: Users, value: '12,000+', label: 'Verified professionals' },
    { icon: Briefcase, value: '50,000+', label: 'Jobs completed' },
    { icon: Building2, value: '3', label: 'Cities covered' },
    { icon: Star, value: '4.8/5', label: 'Average rating' },
    ];

    export function Statistics() {
    return (
        <section className="relative overflow-hidden gradient-brand py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {stats.map((stat, idx) => (
                <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="flex flex-col items-center text-center"
                >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/15 text-white">
                    <stat.icon size={22} />
                </div>
                <span className="mt-3 font-display text-3xl font-bold text-white">{stat.value}</span>
                <span className="mt-1 text-sm text-white/80">{stat.label}</span>
                </motion.div>
            ))}
            </div>
        </div>
        </section>
    );
    }