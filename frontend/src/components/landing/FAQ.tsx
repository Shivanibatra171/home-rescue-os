import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqs = [
  { q: 'How fast can I get a worker?', a: 'Most bookings are matched with a verified worker within 15-30 minutes. Emergency mode requests are prioritized even faster.' },
  { q: 'Are the prices really fixed?', a: 'Yes. Common jobs like tap repair, fan installation, and socket repair have fixed packages so you know the cost before booking.' },
  { q: 'How are workers verified?', a: 'Every worker submits a valid CNIC, phone number, and proof of skill before being approved to join the platform.' },
  { q: 'What if I am not happy with the work?', a: 'Jobs booked through the platform come with a warranty. You can raise an issue directly from your booking history.' },
  { q: 'Can I book through WhatsApp?', a: 'Yes, you can describe your problem and book a service directly through our WhatsApp number for a faster experience.' },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center text-center">
        <span className="text-sm font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
          FAQ
        </span>
        <h2 className="mt-2 font-display text-3xl font-bold text-surface-900 dark:text-surface-50 sm:text-4xl">
          Frequently asked questions
        </h2>
      </div>

      <div className="mt-10 space-y-3">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={faq.q}
              className="overflow-hidden rounded-2xl border border-surface-100 dark:border-surface-800 bg-white dark:bg-surface-900"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
              >
                <span className="font-medium text-surface-900 dark:text-surface-50">{faq.q}</span>
                <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }} className="shrink-0 text-surface-400">
                  <ChevronDown size={18} />
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <p className="px-5 pb-4 text-sm text-surface-500 dark:text-surface-400">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}