import { useParams, Link } from 'react-router-dom';
import { ShieldCheck, Award, MapPin, Clock, Briefcase, Star, Calendar } from 'lucide-react';
import { RatingStars } from '@/components/ui/RatingStars';
import { AvailabilityBadge } from '@/components/ui/AvailabilityBadge';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ReviewCard } from '@/components/review/ReviewCard';
import { EmptyState } from '@/components/ui/EmptyState';
import { dummyWorkers } from '@/data/dummyWorkers';
import { dummyReviews } from '@/data/dummyReviews';
import { formatCurrency } from '@/utils/formatCurrency';

export default function WorkerDetails() {
  const { id } = useParams<{ id: string }>();
  const worker = dummyWorkers.find((w) => w.id === id);
  const reviews = dummyReviews.filter((r) => r.workerId === id);

  if (!worker) {
    return (
      <div className="py-10">
        <EmptyState title="Worker not found" message="This profile doesn't exist or was removed." />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-surface-100 dark:border-surface-800 bg-white dark:bg-surface-900 p-6">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-start gap-4">
            <img src={worker.avatar} alt={worker.name} className="h-20 w-20 rounded-2xl object-cover" />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-display text-xl font-bold text-surface-900 dark:text-surface-50">{worker.name}</h1>
                {worker.isVerified && <ShieldCheck size={18} className="text-brand-500" />}
              </div>
              <p className="text-sm text-surface-500 dark:text-surface-400">{worker.primaryCategory}</p>
              <div className="mt-2"><RatingStars rating={worker.rating} reviewCount={worker.reviewCount} /></div>
              <div className="mt-3 flex flex-wrap gap-1.5">
                <AvailabilityBadge isAvailableNow={worker.isAvailableNow} />
                {worker.hasWarranty && <Badge variant="info" icon={<Award size={12} />}>Warranty</Badge>}
              </div>
            </div>
          </div>
          <Link to={`/dashboard/book/${worker.id}`}>
            <Button size="lg" className="w-full sm:w-auto">Book Now — {formatCurrency(worker.hourlyRate)}</Button>
          </Link>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4 border-t border-surface-100 dark:border-surface-800 pt-6 sm:grid-cols-4">
          <div className="flex items-center gap-2 text-sm text-surface-500 dark:text-surface-400">
            <MapPin size={15} /> {worker.area}, {worker.city}
          </div>
          <div className="flex items-center gap-2 text-sm text-surface-500 dark:text-surface-400">
            <Briefcase size={15} /> {worker.experience} yrs experience
          </div>
          <div className="flex items-center gap-2 text-sm text-surface-500 dark:text-surface-400">
            <Clock size={15} /> Responds {worker.responseTime}
          </div>
          <div className="flex items-center gap-2 text-sm text-surface-500 dark:text-surface-400">
            <Star size={15} /> {worker.completedJobs} jobs done
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-surface-100 dark:border-surface-800 bg-white dark:bg-surface-900 p-6">
        <h2 className="font-display font-semibold text-surface-900 dark:text-surface-50">About</h2>
        <p className="mt-2 text-sm text-surface-500 dark:text-surface-400">{worker.bio}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {worker.skills.map((skill) => <Badge key={skill} variant="neutral">{skill}</Badge>)}
        </div>
      </div>

      {worker.gallery.length > 0 && (
        <div className="rounded-2xl border border-surface-100 dark:border-surface-800 bg-white dark:bg-surface-900 p-6">
          <h2 className="font-display font-semibold text-surface-900 dark:text-surface-50">Recent work</h2>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {worker.gallery.map((img, i) => (
              <img key={i} src={img} alt="" className="aspect-square w-full rounded-xl object-cover" />
            ))}
          </div>
        </div>
      )}

      <div className="rounded-2xl border border-surface-100 dark:border-surface-800 bg-white dark:bg-surface-900 p-6">
        <h2 className="flex items-center gap-2 font-display font-semibold text-surface-900 dark:text-surface-50">
          <Calendar size={16} /> Availability
        </h2>
        <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {worker.workingHours.map((wh) => (
            <div key={wh.day} className={`rounded-lg border p-2.5 text-center text-xs ${wh.isAvailable ? 'border-surface-100 dark:border-surface-800' : 'border-surface-100 dark:border-surface-800 opacity-40'}`}>
              <p className="font-semibold text-surface-800 dark:text-surface-100">{wh.day}</p>
              <p className="mt-0.5 text-surface-400">{wh.isAvailable ? `${wh.start}-${wh.end}` : 'Off'}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-surface-100 dark:border-surface-800 bg-white dark:bg-surface-900 p-6">
        <h2 className="font-display font-semibold text-surface-900 dark:text-surface-50">Reviews ({reviews.length})</h2>
        {reviews.length === 0 ? (
          <div className="mt-4"><EmptyState title="No reviews yet" message="Be the first to review this worker." /></div>
        ) : (
          <div className="mt-4 space-y-4">
            {reviews.map((review) => <ReviewCard key={review.id} review={review} />)}
          </div>
        )}
      </div>
    </div>
  );
}