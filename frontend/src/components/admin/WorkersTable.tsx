import { useState, useRef } from 'react';
import { MoreVertical, Trash2, CheckCircle2, XCircle, Eye, ShieldCheck } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { RatingStars } from '@/components/ui/RatingStars';
import { useClickOutside } from '@/hooks/useClickOutside';
import type { Worker } from '@/types';

export function WorkersTable({
  workers,
  onApprove,
  onReject,
  onDelete,
}: {
  workers: (Worker & { verificationStatus: 'pending' | 'approved' | 'rejected' })[];
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-surface-100 dark:border-surface-800 bg-white dark:bg-surface-900">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-surface-100 dark:border-surface-800 text-xs text-surface-400">
            <th className="p-4 font-medium">Worker</th>
            <th className="p-4 font-medium">Category</th>
            <th className="p-4 font-medium">Rating</th>
            <th className="p-4 font-medium">Status</th>
            <th className="p-4 font-medium text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {workers.map((worker) => (
            <WorkerRow key={worker.id} worker={worker} onApprove={onApprove} onReject={onReject} onDelete={onDelete} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

function WorkerRow({
  worker,
  onApprove,
  onReject,
  onDelete,
}: {
  worker: Worker & { verificationStatus: 'pending' | 'approved' | 'rejected' };
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  onDelete: (id: string) => void;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  useClickOutside(menuRef, () => setMenuOpen(false));

  const statusVariant = { pending: 'warning', approved: 'success', rejected: 'danger' } as const;
  const statusLabel = { pending: 'Pending', approved: 'Approved', rejected: 'Rejected' } as const;

  return (
    <tr className="border-b border-surface-50 dark:border-surface-800/50 last:border-0">
      <td className="p-4">
        <div className="flex items-center gap-3">
          <img src={worker.avatar} alt={worker.name} className="h-9 w-9 rounded-full object-cover" />
          <div className="flex items-center gap-1.5">
            <span className="font-medium text-surface-800 dark:text-surface-100">{worker.name}</span>
            {worker.isVerified && <ShieldCheck size={13} className="text-brand-500" />}
          </div>
        </div>
      </td>
      <td className="p-4 text-surface-500 dark:text-surface-400">{worker.primaryCategory}</td>
      <td className="p-4"><RatingStars rating={worker.rating} size={13} /></td>
      <td className="p-4"><Badge variant={statusVariant[worker.verificationStatus]}>{statusLabel[worker.verificationStatus]}</Badge></td>
      <td className="relative p-4 text-right">
        {worker.verificationStatus === 'pending' ? (
          <div className="flex justify-end gap-2">
            <button onClick={() => onReject(worker.id)} className="flex items-center gap-1 rounded-lg border border-surface-200 dark:border-surface-700 px-2.5 py-1.5 text-xs font-semibold text-surface-600 dark:text-surface-300 hover:bg-surface-50 dark:hover:bg-surface-800">
              <XCircle size={13} /> Reject
            </button>
            <button onClick={() => onApprove(worker.id)} className="flex items-center gap-1 rounded-lg bg-brand-600 px-2.5 py-1.5 text-xs font-semibold text-white hover:bg-brand-700">
              <CheckCircle2 size={13} /> Approve
            </button>
          </div>
        ) : (
          <button onClick={() => setMenuOpen((p) => !p)} className="rounded-lg p-1.5 text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-800">
            <MoreVertical size={16} />
          </button>
        )}
        {menuOpen && (
          <div ref={menuRef} className="absolute right-4 top-12 z-10 w-40 rounded-xl border border-surface-100 dark:border-surface-800 bg-white dark:bg-surface-900 py-1.5 shadow-[var(--shadow-elevated)]">
            <button className="flex w-full items-center gap-2 px-3.5 py-2 text-xs font-medium text-surface-600 dark:text-surface-300 hover:bg-surface-50 dark:hover:bg-surface-800">
              <Eye size={13} /> View profile
            </button>
            <button onClick={() => onDelete(worker.id)} className="flex w-full items-center gap-2 px-3.5 py-2 text-xs font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30">
              <Trash2 size={13} /> Delete account
            </button>
          </div>
        )}
      </td>
    </tr>
  );
}