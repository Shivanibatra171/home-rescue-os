import { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { BookingsTable } from '@/components/admin/BookingsTable';
import { EmptyState } from '@/components/ui/EmptyState';
import { Pagination } from '@/components/ui/Pagination';
import { usePagination } from '@/hooks/usePagination';
import { dummyBookings } from '@/data/dummyBookings';

export default function ManageBookings() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const filtered = useMemo(() => {
    return dummyBookings.filter((b) => {
      const matchesSearch = b.userName.toLowerCase().includes(search.toLowerCase()) || b.workerName.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = !statusFilter || b.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [search, statusFilter]);

  const { page, totalPages, paginated, goToPage } = usePagination(filtered, 6);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-surface-900 dark:text-surface-50">Manage bookings</h1>
          <p className="mt-1 text-sm text-surface-500 dark:text-surface-400">{dummyBookings.length} total bookings</p>
        </div>
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <Input placeholder="Search by name..." leftIcon={<Search size={16} />} value={search} onChange={(e) => setSearch(e.target.value)} />
          <Select
            placeholder="All statuses"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            options={[
              { label: 'Pending', value: 'pending' }, { label: 'Accepted', value: 'accepted' },
              { label: 'Completed', value: 'completed' }, { label: 'Cancelled', value: 'cancelled' },
            ]}
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <EmptyState title="No bookings found" message="Try adjusting your search or filter." />
      ) : (
        <>
          <BookingsTable bookings={paginated} />
          <Pagination page={page} totalPages={totalPages} onPageChange={goToPage} />
        </>
      )}
    </div>
  );
}