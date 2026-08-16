import { useState, useMemo } from 'react';
import toast from 'react-hot-toast';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { UsersTable } from '@/components/admin/UsersTable';
import { EmptyState } from '@/components/ui/EmptyState';
import { Pagination } from '@/components/ui/Pagination';
import { usePagination } from '@/hooks/usePagination';
import { dummyUsers } from '@/data/dummyUsers';
import type { User } from '@/types';

export default function ManageUsers() {
  const [users, setUsers] = useState<User[]>(dummyUsers);
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    return users.filter((u) => u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()));
  }, [users, search]);

  const { page, totalPages, paginated, goToPage } = usePagination(filtered, 5);

  const handleDelete = (id: string) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
    toast.success('User account deleted');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-surface-900 dark:text-surface-50">Manage users</h1>
          <p className="mt-1 text-sm text-surface-500 dark:text-surface-400">{users.length} registered users</p>
        </div>
        <div className="w-full sm:w-72">
          <Input placeholder="Search users..." leftIcon={<Search size={16} />} value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
      </div>

      {filtered.length === 0 ? (
        <EmptyState title="No users found" message="Try a different search term." />
      ) : (
        <>
          <UsersTable users={paginated} onDelete={handleDelete} />
          <Pagination page={page} totalPages={totalPages} onPageChange={goToPage} />
        </>
      )}
    </div>
  );
}