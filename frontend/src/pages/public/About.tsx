import { motion } from 'framer-motion';
import { Target, Heart, ShieldCheck, TrendingUp } from 'lucide-react';
import { Statistics } from '@/components/landing/Statistics';
import { Testimonials } from '@/components/landing/Testimonials';

const values = [
  { icon: ShieldCheck, title: 'Trust First', desc: 'Every worker is verified before they can accept a single job.' },
  { icon: Heart, title: 'Customer Obsessed', desc: 'We design every feature around solving the problem fast, not just listing names.' },
  { icon: Target, title: 'Fair Pricing', desc: 'Fixed-price packages mean no one gets overcharged for a simple repair.' },
  { icon: TrendingUp, title: 'Always Improving', desc: 'We listen to feedback from both homeowners and workers to keep improving.' },
];

export default function About() {
  return (
    <div>
      <section className="relative overflow-hidden gradient-hero py-20">
        <div
          className="absolute inset-0 opacity-[0.15]"
          style={{ backgroundImage: 'radial-gradient(circle at 25% 25%, white 1px, transparent 1px)', backgroundSize: '32px 32px' }}
        />
        <div className="relative z-10 mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-display text-4xl font-bold text-white sm:text-5xl"
          >
            Fixing homes, one job at a time
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mx-auto mt-4 max-w-xl text-white/80"
          >
            Home Rescue OS was built to solve a simple, everyday problem: finding a trustworthy home repair professional, fast.
          </motion.p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
          <div>
            <span className="text-sm font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
              Our Story
            </span>
            <h2 className="mt-2 font-display text-2xl font-bold text-surface-900 dark:text-surface-50">
              Why we built this
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-surface-500 dark:text-surface-400">
              Every homeowner has a story of waiting hours for an electrician, or getting overcharged by a plumber they found through a random referral. We built Home Rescue OS to remove that uncertainty entirely — verified professionals, fixed pricing, and a booking flow that actually respects your time.
            </p>
          </div>
          <div>
            <span className="text-sm font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
              Our Mission
            </span>
            <h2 className="mt-2 font-display text-2xl font-bold text-surface-900 dark:text-surface-50">
              Where we're headed
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-surface-500 dark:text-surface-400">
              We started in Karachi, and we're expanding city by city. Our goal is to become the default place every homeowner turns to when something breaks — for any home service, in any city.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-surface-50 dark:bg-surface-950 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
              Our Values
            </span>
            <h2 className="mt-2 font-display text-3xl font-bold text-surface-900 dark:text-surface-50">
              What drives us every day
            </h2>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, idx) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="flex flex-col items-center rounded-2xl border border-surface-100 dark:border-surface-800 bg-white dark:bg-surface-900 p-6 text-center card-hover"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 dark:bg-brand-950 text-brand-600 dark:text-brand-400">
                  <value.icon size={22} />
                </div>
                <h3 className="mt-4 font-display font-semibold text-surface-900 dark:text-surface-50">{value.title}</h3>
                <p className="mt-2 text-sm text-surface-500 dark:text-surface-400">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Statistics />
      <Testimonials />
    </div>
  );
}