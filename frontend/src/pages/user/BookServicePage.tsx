import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { MapPin, AlertTriangle } from 'lucide-react';
import toast from 'react-hot-toast';
import { Textarea } from '@/components/ui/Textarea';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { EmptyState } from '@/components/ui/EmptyState';
import { ImageUploadBox } from '@/components/booking/ImageUploadBox';
import { DatePicker } from '@/components/booking/DatePicker';
import { dummyWorkers } from '@/data/dummyWorkers';
import { formatCurrency } from '@/utils/formatCurrency';
import { ROUTES } from '@/utils/constants';

interface BookingForm {
  problemDescription: string;
  address: string;
  isEmergency: boolean;
}

export default function BookServicePage() {
  const { workerId } = useParams<{ workerId: string }>();
  const navigate = useNavigate();
  const worker = dummyWorkers.find((w) => w.id === workerId);

  const [images, setImages] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<BookingForm>({ defaultValues: { isEmergency: false } });

  if (!worker) {
    return <EmptyState title="Worker not found" message="This professional is no longer available." />;
  }

  const onSubmit = (data: BookingForm) => {
    if (!selectedDate || !selectedTime) {
      toast.error('Please select a date and time');
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      toast.success('Booking request sent!');
      setIsLoading(false);
      navigate(ROUTES.BOOKING_HISTORY);
    }, 900);
  };

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-surface-900 dark:text-surface-50">Book a service</h1>
        <p className="mt-1 text-sm text-surface-500 dark:text-surface-400">Fill in the details so the right pro can help you.</p>
      </div>

      <div className="flex items-center gap-3 rounded-2xl border border-surface-100 dark:border-surface-800 bg-white dark:bg-surface-900 p-4">
        <img src={worker.avatar} alt={worker.name} className="h-12 w-12 rounded-full object-cover" />
        <div className="flex-1">
          <h3 className="text-sm font-semibold text-surface-900 dark:text-surface-50">{worker.name}</h3>
          <p className="text-xs text-surface-400">{worker.primaryCategory} · {worker.area}</p>
        </div>
        <span className="font-display font-bold text-brand-600 dark:text-brand-400">{formatCurrency(worker.hourlyRate)}</span>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 rounded-2xl border border-surface-100 dark:border-surface-800 bg-white dark:bg-surface-900 p-6">
        <Textarea
          label="Describe the problem"
          placeholder="e.g. Kitchen tap is leaking continuously and water pressure is low..."
          error={errors.problemDescription?.message}
          {...register('problemDescription', { required: 'Please describe the issue', minLength: { value: 10, message: 'Please add a bit more detail' } })}
        />

        <ImageUploadBox images={images} onChange={setImages} />

        <Input
          label="Service address"
          placeholder="House 12, Street 4, Gulshan-e-Iqbal"
          leftIcon={<MapPin size={16} />}
          error={errors.address?.message}
          {...register('address', { required: 'Address is required' })}
        />

        <DatePicker selectedDate={selectedDate} selectedTime={selectedTime} onDateChange={setSelectedDate} onTimeChange={setSelectedTime} />

        <Controller
          name="isEmergency"
          control={control}
          render={({ field }) => (
            <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-red-100 dark:border-red-900/40 bg-red-50/50 dark:bg-red-950/20 p-4">
              <input
                type="checkbox"
                checked={field.value}
                onChange={(e) => field.onChange(e.target.checked)}
                className="mt-0.5 rounded border-surface-300 text-red-600 focus-ring"
              />
              <span>
                <span className="flex items-center gap-1.5 text-sm font-semibold text-red-700 dark:text-red-400">
                  <AlertTriangle size={14} /> This is an emergency
                </span>
                <span className="text-xs text-surface-500 dark:text-surface-400">Emergency requests get priority matching and faster response.</span>
              </span>
            </label>
          )}
        />

        <Button type="submit" size="lg" className="w-full" isLoading={isLoading}>
          Confirm Booking — {formatCurrency(worker.hourlyRate)}
        </Button>
      </form>
    </div>
  );
}