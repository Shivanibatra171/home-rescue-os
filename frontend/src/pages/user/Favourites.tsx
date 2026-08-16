import { Heart } from 'lucide-react';
import { WorkerCard } from '@/components/worker/WorkerCard';
import { EmptyState } from '@/components/ui/EmptyState';
import { dummyWorkers } from '@/data/dummyWorkers';

export default function Favourites() {
  const favourites = dummyWorkers.slice(0, 2);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-surface-900 dark:text-surface-50">Favourite workers</h1>
        <p className="mt-1 text-sm text-surface-500 dark:text-surface-400">Your saved professionals for quick rebooking.</p>
      </div>

      {favourites.length === 0 ? (
        <EmptyState icon={<Heart size={26} />} title="No favourites yet" message="Save workers you like for quick access next time." />
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {favourites.map((worker) => <WorkerCard key={worker.id} worker={worker} />)}
        </div>
      )}
    </div>
  );
}