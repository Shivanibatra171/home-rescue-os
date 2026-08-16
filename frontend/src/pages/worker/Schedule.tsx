import { useState } from 'react';
import toast from 'react-hot-toast';
import { Clock } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { dummyWorkers } from '@/data/dummyWorkers';
import type { WorkingHours } from '@/types';

export default function Schedule() {
  const [hours, setHours] = useState<WorkingHours[]>(dummyWorkers[0].workingHours);

  const toggleDay = (day: string) => {
    setHours((prev) => prev.map((h) => (h.day === day ? { ...h, isAvailable: !h.isAvailable } : h)));
  };

  const updateTime = (day: string, field: 'start' | 'end', value: string) => {
    setHours((prev) => prev.map((h) => (h.day === day ? { ...h, [field]: value } : h)));
  };

  const saveSchedule = () => {
    toast.success('Schedule updated successfully!');
  };

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-surface-900 dark:text-surface-50">Set your availability</h1>
        <p className="mt-1 text-sm text-surface-500 dark:text-surface-400">Let customers know when you're available for jobs.</p>
      </div>

      <div className="rounded-2xl border border-surface-100 dark:border-surface-800 bg-white dark:bg-surface-900 p-6 space-y-4">
        {hours.map((h) => (
          <div key={h.day} className="flex flex-col gap-3 border-b border-surface-100 dark:border-surface-800 pb-4 last:border-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between">
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={h.isAvailable}
                onChange={() => toggleDay(h.day)}
                className="rounded border-surface-300 text-brand-600 focus-ring"
              />
              <span className="w-12 text-sm font-semibold text-surface-900 dark:text-surface-50">{h.day}</span>
            </label>

            {h.isAvailable ? (
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5 rounded-lg border border-surface-200 dark:border-surface-700 px-2.5 py-1.5">
                  <Clock size={13} className="text-surface-400" />
                  <input
                    type="time"
                    value={h.start}
                    onChange={(e) => updateTime(h.day, 'start', e.target.value)}
                    className="bg-transparent text-xs text-surface-700 dark:text-surface-300 focus:outline-none"
                  />
                </div>
                <span className="text-xs text-surface-400">to</span>
                <div className="flex items-center gap-1.5 rounded-lg border border-surface-200 dark:border-surface-700 px-2.5 py-1.5">
                  <input
                    type="time"
                    value={h.end}
                    onChange={(e) => updateTime(h.day, 'end', e.target.value)}
                    className="bg-transparent text-xs text-surface-700 dark:text-surface-300 focus:outline-none"
                  />
                </div>
              </div>
            ) : (
              <span className="text-xs font-medium text-surface-400">Unavailable</span>
            )}
          </div>
        ))}
      </div>

      <Button onClick={saveSchedule} size="lg">Save Schedule</Button>
    </div>
  );
}