import { useMemo } from 'react';
import { cn } from '@/utils/cn';

const timeSlots = ['09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'];

export function DatePicker({
  selectedDate,
  selectedTime,
  onDateChange,
  onTimeChange,
}: {
  selectedDate: string;
  selectedTime: string;
  onDateChange: (date: string) => void;
  onTimeChange: (time: string) => void;
}) {
  const next7Days = useMemo(() => {
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date();
      d.setDate(d.getDate() + i);
      return {
        iso: d.toISOString().split('T')[0],
        day: d.toLocaleDateString('en-US', { weekday: 'short' }),
        date: d.getDate(),
      };
    });
  }, []);

  return (
    <div className="space-y-4">
      <div>
        <label className="mb-2 block text-sm font-medium text-surface-700 dark:text-surface-300">Select a date</label>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {next7Days.map((d) => (
            <button
              key={d.iso}
              type="button"
              onClick={() => onDateChange(d.iso)}
              className={cn(
                'flex min-w-[56px] flex-col items-center gap-0.5 rounded-xl border px-3 py-2.5 transition-colors',
                selectedDate === d.iso
                  ? 'border-brand-500 bg-brand-50 dark:bg-brand-950 text-brand-700 dark:text-brand-400'
                  : 'border-surface-200 dark:border-surface-700 text-surface-600 dark:text-surface-300 hover:border-brand-300'
              )}
            >
              <span className="text-[10px] font-medium uppercase">{d.day}</span>
              <span className="text-sm font-bold">{d.date}</span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-surface-700 dark:text-surface-300">Select a time</label>
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
          {timeSlots.map((time) => (
            <button
              key={time}
              type="button"
              onClick={() => onTimeChange(time)}
              className={cn(
                'rounded-lg border py-2 text-xs font-semibold transition-colors',
                selectedTime === time
                  ? 'border-brand-500 bg-brand-50 dark:bg-brand-950 text-brand-700 dark:text-brand-400'
                  : 'border-surface-200 dark:border-surface-700 text-surface-600 dark:text-surface-300 hover:border-brand-300'
              )}
            >
              {time}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}