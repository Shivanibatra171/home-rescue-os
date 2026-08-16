import { motion } from 'framer-motion';
import { Apple, PlayCircle, Smartphone } from 'lucide-react';

export function DownloadApp() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-3xl gradient-hero px-6 py-14 sm:px-14">
        <div
          className="absolute inset-0 opacity-[0.12]"
          style={{ backgroundImage: 'radial-gradient(circle at 80% 20%, white 1px, transparent 1px)', backgroundSize: '28px 28px' }}
        />
        <div className="relative z-10 grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">
              Take Home Rescue OS with you
            </h2>
            <p className="mt-4 max-w-md text-white/80">
              Book services, track your worker live, and get instant notifications — right from your phone.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#" className="flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-surface-900 hover:bg-white/90">
                <Apple size={18} /> App Store
              </a>
              <a href="#" className="flex items-center gap-2 rounded-xl bg-white/15 backdrop-blur-sm px-5 py-3 text-sm font-semibold text-white hover:bg-white/25">
                <PlayCircle size={18} /> Google Play
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex justify-center lg:justify-end"
          >
            <div className="flex h-56 w-56 items-center justify-center rounded-3xl bg-white/10 backdrop-blur-sm border border-white/20">
              <Smartphone size={80} className="text-white/90" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}