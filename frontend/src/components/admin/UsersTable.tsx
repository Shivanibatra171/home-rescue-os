import { MoreVertical, Trash2, Eye } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { formatDate } from '@/utils/formatDate';
import { useState, useRef } from 'react';
import { useClickOutside } from '@/hooks/useClickOutside';
import type { User } from '@/types';

export function UsersTable({ users, onDelete }: { users: User[]; onDelete: (id: string) => void }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-surface-100 dark:border-surface-800 bg-white dark:bg-surface-900">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-surface-100 dark:border-surface-800 text-xs text-surface-400">
            <th className="p-4 font-medium">Name</th>
            <th className="p-4 font-medium">Email</th>
            <th className="p-4 font-medium">City</th>
            <th className="p-4 font-medium">Joined</th>
            <th className="p-4 font-medium">Status</th>
            <th className="p-4 font-medium text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <UserRow key={user.id} user={user} onDelete={onDelete} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

function UserRow({ user, onDelete }: { user: User; onDelete: (id: string) => void }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  useClickOutside(menuRef, () => setMenuOpen(false));

  return (
    <tr className="border-b border-surface-50 dark:border-surface-800/50 last:border-0">
      <td className="p-4">
        <div className="flex items-center gap-3">
          <img src={user.avatar} alt={user.name} className="h-9 w-9 rounded-full object-cover" />
          <span className="font-medium text-surface-800 dark:text-surface-100">{user.name}</span>
        </div>
      </td>
      <td className="p-4 text-surface-500 dark:text-surface-400">{user.email}</td>
      <td className="p-4 text-surface-500 dark:text-surface-400">{user.city}</td>
      <td className="p-4 text-surface-500 dark:text-surface-400">{formatDate(user.createdAt)}</td>
      <td className="p-4"><Badge variant="success">Active</Badge></td>
      <td className="relative p-4 text-right">
        <button onClick={() => setMenuOpen((p) => !p)} className="rounded-lg p-1.5 text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-800">
          <MoreVertical size={16} />
        </button>
        {menuOpen && (
          <div ref={menuRef} className="absolute right-4 top-12 z-10 w-40 rounded-xl border border-surface-100 dark:border-surface-800 bg-white dark:bg-surface-900 py-1.5 shadow-[var(--shadow-elevated)]">
            <button className="flex w-full items-center gap-2 px-3.5 py-2 text-xs font-medium text-surface-600 dark:text-surface-300 hover:bg-surface-50 dark:hover:bg-surface-800">
              <Eye size={13} /> View details
            </button>
            <button onClick={() => onDelete(user.id)} className="flex w-full items-center gap-2 px-3.5 py-2 text-xs font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30">
              <Trash2 size={13} /> Delete account
            </button>
          </div>
        )}
      </td>
    </tr>
  );
}