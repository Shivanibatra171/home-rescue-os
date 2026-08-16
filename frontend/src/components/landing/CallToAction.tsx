import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { ROUTES } from '@/utils/constants';

export function CallToAction() {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center gap-6 rounded-3xl border border-surface-100 dark:border-surface-800 bg-white dark:bg-surface-900 px-6 py-14 text-center"
      >
        <h2 className="font-display text-2xl font-bold text-surface-900 dark:text-surface-50 sm:text-3xl">
          Something broken at home right now?
        </h2>
        <p className="max-w-md text-surface-500 dark:text-surface-400">
          Get matched with a verified professional in minutes. No calls, no waiting around.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link to={ROUTES.USER_REGISTER}>
            <Button size="lg" rightIcon={<ArrowRight size={18} />}>Book a Service</Button>
          </Link>
          <Link to={ROUTES.WORKER_REGISTER}>
            <Button size="lg" variant="outline">Join as a Pro</Button>
          </Link>
        </div>
      </motion.div>
    </section>
  );
}