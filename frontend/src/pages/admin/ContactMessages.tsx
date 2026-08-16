import { useState } from 'react';
import { Mail, MailOpen, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { EmptyState } from '@/components/ui/EmptyState';
import { timeAgo } from '@/utils/formatDate';
import { dummyMessages } from '@/data/dummyMessages';

export default function ContactMessages() {
  const [messages, setMessages] = useState(dummyMessages);

  const markAsRead = (id: string) => {
    setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, isRead: true } : m)));
  };

  const handleDelete = (id: string) => {
    setMessages((prev) => prev.filter((m) => m.id !== id));
    toast.success('Message deleted');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-surface-900 dark:text-surface-50">Contact messages</h1>
        <p className="mt-1 text-sm text-surface-500 dark:text-surface-400">{messages.filter((m) => !m.isRead).length} unread messages</p>
      </div>

      {messages.length === 0 ? (
        <EmptyState icon={<Mail size={26} />} title="No messages" message="Contact form submissions will appear here." />
      ) : (
        <div className="space-y-3">
          {messages.map((msg) => (
            <div
              key={msg.id}
              onClick={() => markAsRead(msg.id)}
              className={`cursor-pointer rounded-2xl border p-5 transition-colors ${
                msg.isRead ? 'border-surface-100 dark:border-surface-800 bg-white dark:bg-surface-900' : 'border-brand-100 dark:border-brand-900/40 bg-brand-50/40 dark:bg-brand-950/20'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2">
                  {msg.isRead ? <MailOpen size={15} className="text-surface-400" /> : <Mail size={15} className="text-brand-500" />}
                  <span className="text-sm font-semibold text-surface-900 dark:text-surface-50">{msg.name}</span>
                  <span className="text-xs text-surface-400">{msg.email}</span>
                </div>
                <button onClick={(e) => { e.stopPropagation(); handleDelete(msg.id); }} className="rounded-lg p-1.5 text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30">
                  <Trash2 size={14} />
                </button>
              </div>
              <p className="mt-2 text-sm font-medium text-surface-800 dark:text-surface-100">{msg.subject}</p>
              <p className="mt-1 text-sm text-surface-500 dark:text-surface-400">{msg.message}</p>
              <p className="mt-2 text-xs text-surface-400">{timeAgo(msg.createdAt)}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}