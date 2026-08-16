import { Link } from 'react-router-dom';
import { ShieldCheck, Award, MapPin } from 'lucide-react';
import { RatingStars } from '@/components/ui/RatingStars';
import { AvailabilityBadge } from '@/components/ui/AvailabilityBadge';
import { Badge } from '@/components/ui/Badge';
import { formatCurrency } from '@/utils/formatCurrency';
import type { Worker } from '@/types';

export function WorkerCard({ worker }: { worker: Worker }) {
  return (
    <Link
      to={`/dashboard/workers/${worker.id}`}
      className="group flex flex-col rounded-2xl border border-surface-100 dark:border-surface-800 bg-white dark:bg-surface-900 p-5 card-hover"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <img src={worker.avatar} alt={worker.name} className="h-14 w-14 rounded-full object-cover" />
          <div>
            <h3 className="font-display font-semibold text-surface-900 dark:text-surface-50">{worker.name}</h3>
            <p className="text-xs text-surface-400">{worker.primaryCategory}</p>
          </div>
        </div>
        {worker.isVerified && (
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-50 dark:bg-brand-950 text-brand-600 dark:text-brand-400">
            <ShieldCheck size={14} />
          </span>
        )}
      </div>

      <div className="mt-4 flex items-center gap-3">
        <RatingStars rating={worker.rating} size={14} reviewCount={worker.reviewCount} />
      </div>

      <div className="mt-3 flex items-center gap-1.5 text-xs text-surface-500 dark:text-surface-400">
        <MapPin size={13} /> {worker.area}, {worker.city}
      </div>

      <div className="mt-4 flex flex-wrap gap-1.5">
        <AvailabilityBadge isAvailableNow={worker.isAvailableNow} />
        {worker.hasWarranty && (
          <Badge variant="info" icon={<Award size={12} />}>Warranty</Badge>
        )}
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-surface-100 dark:border-surface-800 pt-4">
        <span className="text-xs text-surface-400">Starting from</span>
        <span className="font-display font-bold text-surface-900 dark:text-surface-50">{formatCurrency(worker.hourlyRate)}</span>
      </div>
    </Link>
  );
}