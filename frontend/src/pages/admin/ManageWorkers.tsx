import { useState, useMemo } from 'react';
import toast from 'react-hot-toast';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { WorkersTable } from '@/components/admin/WorkersTable';
import { EmptyState } from '@/components/ui/EmptyState';
import { Pagination } from '@/components/ui/Pagination';
import { usePagination } from '@/hooks/usePagination';
import { dummyWorkers } from '@/data/dummyWorkers';
import type { Worker } from '@/types';

type VerificationStatus = 'pending' | 'approved' | 'rejected';
type WorkerWithStatus = Worker & { verificationStatus: VerificationStatus };

const initialWorkers: WorkerWithStatus[] = dummyWorkers.map((w, idx) => ({
  ...w,
  verificationStatus: idx === 4 ? 'pending' : w.isVerified ? 'approved' : 'pending',
}));

export default function ManageWorkers() {
  const [workers, setWorkers] = useState<WorkerWithStatus[]>(initialWorkers);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const filtered = useMemo(() => {
    return workers.filter((w) => {
      const matchesSearch = w.name.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = !statusFilter || w.verificationStatus === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [workers, search, statusFilter]);

  const { page, totalPages, paginated, goToPage } = usePagination(filtered, 5);

  const handleApprove = (id: string) => {
    setWorkers((prev) => prev.map((w) => (w.id === id ? { ...w, verificationStatus: 'approved', isVerified: true } : w)));
    toast.success('Worker approved');
  };

  const handleReject = (id: string) => {
    setWorkers((prev) => prev.map((w) => (w.id === id ? { ...w, verificationStatus: 'rejected', isVerified: false } : w)));
    toast.error('Worker rejected');
  };

  const handleDelete = (id: string) => {
    setWorkers((prev) => prev.filter((w) => w.id !== id));
    toast.success('Worker account deleted');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-surface-900 dark:text-surface-50">Manage workers</h1>
          <p className="mt-1 text-sm text-surface-500 dark:text-surface-400">{workers.length} registered professionals</p>
        </div>
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <Input placeholder="Search workers..." leftIcon={<Search size={16} />} value={search} onChange={(e) => setSearch(e.target.value)} />
          <Select
            placeholder="All statuses"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            options={[{ label: 'Pending', value: 'pending' }, { label: 'Approved', value: 'approved' }, { label: 'Rejected', value: 'rejected' }]}
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <EmptyState title="No workers found" message="Try adjusting your search or filter." />
      ) : (
        <>
          <WorkersTable workers={paginated} onApprove={handleApprove} onReject={handleReject} onDelete={handleDelete} />
          <Pagination page={page} totalPages={totalPages} onPageChange={goToPage} />
        </>
      )}
    </div>
  );
}