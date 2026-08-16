import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Search, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { ROUTES } from '@/utils/constants';

export default function NotFound() {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center px-4 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <span className="font-display text-8xl font-bold gradient-text sm:text-9xl">404</span>
        <h1 className="mt-4 font-display text-2xl font-bold text-surface-900 dark:text-surface-50 sm:text-3xl">
          This page went missing
        </h1>
        <p className="mx-auto mt-3 max-w-md text-surface-500 dark:text-surface-400">
          Looks like this page broke down before we could fix it. Let's get you back somewhere useful.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to={ROUTES.HOME}>
            <Button leftIcon={<Home size={16} />}>Go Home</Button>
          </Link>
          <Link to={ROUTES.SERVICES}>
            <Button variant="outline" leftIcon={<Search size={16} />}>Browse Services</Button>
          </Link>
        </div>
        <button
          onClick={() => window.history.back()}
          className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-surface-400 hover:text-brand-600 dark:hover:text-brand-400"
        >
          <ArrowLeft size={14} /> Go back
        </button>
      </motion.div>
    </div>
  );
}