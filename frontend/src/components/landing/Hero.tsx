    import { motion } from 'framer-motion';
    import { ShieldCheck, Clock, Star, Users } from 'lucide-react';
    import { SearchBar } from './SearchBar';

    const stats = [
    { icon: Users, value: '12,000+', label: 'Verified pros' },
    { icon: ShieldCheck, value: '50,000+', label: 'Jobs completed' },
    { icon: Star, value: '4.8/5', label: 'Average rating' },
    ];

    export function Hero() {
    return (
        <section className="relative overflow-hidden gradient-hero">
        <div
            className="absolute inset-0 opacity-[0.15]"
            style={{ backgroundImage: 'radial-gradient(circle at 25% 25%, white 1px, transparent 1px)', backgroundSize: '32px 32px' }}
        />
        <div className="relative z-10 mx-auto max-w-5xl px-4 py-20 text-center sm:px-6 sm:py-28 lg:px-8">
            <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur-sm px-4 py-1.5 text-sm font-medium text-white"
            >
            <Clock size={14} />
            Get matched with a verified pro in minutes
            </motion.div>

            <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-6 font-display text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl"
            >
            Your home broke.
            <br />
            We'll fix it, fast.
            </motion.h1>

            <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mx-auto mt-5 max-w-xl text-lg text-white/80"
            >
            Describe the problem, upload a photo, and get matched with a verified plumber, electrician, or technician near you — with fixed pricing and warranty.
            </motion.p>

            <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mx-auto mt-10 max-w-2xl"
            >
            <SearchBar />
            </motion.div>

            <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mx-auto mt-14 grid max-w-2xl grid-cols-3 gap-6"
            >
            {stats.map((stat) => (
                <div key={stat.label} className="flex flex-col items-center gap-1.5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 text-white">
                    <stat.icon size={18} />
                </div>
                <span className="font-display text-xl font-bold text-white sm:text-2xl">{stat.value}</span>
                <span className="text-xs text-white/70 sm:text-sm">{stat.label}</span>
                </div>
            ))}
            </motion.div>
        </div>

        <div className="relative z-10 h-16 bg-gradient-to-b from-transparent to-surface-50 dark:to-surface-950" />
        </section>
    );
    }