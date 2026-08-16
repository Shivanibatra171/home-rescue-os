import { useState } from 'react';
import toast from 'react-hot-toast';
import { Plus, Pencil, Trash2, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Modal } from '@/components/ui/Modal';
import { EmptyState } from '@/components/ui/EmptyState';
import { Badge } from '@/components/ui/Badge';
import { dummyCategories } from '@/data/dummyCategories';
import { formatCurrency } from '@/utils/formatCurrency';

interface ServiceItem {
  id: string;
  name: string;
  categorySlug: string;
  price: number;
  duration: string;
}

const initialServices: ServiceItem[] = [
  { id: 'svc-1', name: 'Tap repair', categorySlug: 'plumber', price: 500, duration: '30 min' },
  { id: 'svc-2', name: 'Fan installation', categorySlug: 'electrician', price: 600, duration: '45 min' },
  { id: 'svc-3', name: 'Socket repair', categorySlug: 'electrician', price: 400, duration: '20 min' },
  { id: 'svc-4', name: 'AC gas refill', categorySlug: 'ac-repair', price: 1500, duration: '1 hr' },
  { id: 'svc-5', name: 'Wall painting (per room)', categorySlug: 'painter', price: 3500, duration: '4 hrs' },
];

export default function ManageServices() {
  const [services, setServices] = useState<ServiceItem[]>(initialServices);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editing, setEditing] = useState<ServiceItem | null>(null);
  const [name, setName] = useState('');
  const [categorySlug, setCategorySlug] = useState('');
  const [price, setPrice] = useState('');
  const [duration, setDuration] = useState('');

  const categoryName = (slug: string) => dummyCategories.find((c) => c.slug === slug)?.name ?? slug;

  const openAdd = () => {
    setEditing(null);
    setName(''); setCategorySlug(''); setPrice(''); setDuration('');
    setIsModalOpen(true);
  };

  const openEdit = (service: ServiceItem) => {
    setEditing(service);
    setName(service.name); setCategorySlug(service.categorySlug); setPrice(String(service.price)); setDuration(service.duration);
    setIsModalOpen(true);
  };

  const handleSave = () => {
    if (!name.trim() || !categorySlug) {
      toast.error('Name and category are required');
      return;
    }
    if (editing) {
      setServices((prev) => prev.map((s) => (s.id === editing.id ? { ...s, name, categorySlug, price: Number(price) || 0, duration } : s)));
      toast.success('Service updated');
    } else {
      setServices((prev) => [...prev, { id: `svc-${Date.now()}`, name, categorySlug, price: Number(price) || 0, duration }]);
      toast.success('Service added');
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    setServices((prev) => prev.filter((s) => s.id !== id));
    toast.success('Service deleted');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-surface-900 dark:text-surface-50">Manage services</h1>
          <p className="mt-1 text-sm text-surface-500 dark:text-surface-400">{services.length} fixed-price service packages</p>
        </div>
        <Button leftIcon={<Plus size={16} />} onClick={openAdd}>Add Service</Button>
      </div>

      {services.length === 0 ? (
        <EmptyState title="No services yet" message="Add a fixed-price service package." />
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-surface-100 dark:border-surface-800 bg-white dark:bg-surface-900">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-surface-100 dark:border-surface-800 text-xs text-surface-400">
                <th className="p-4 font-medium">Service</th>
                <th className="p-4 font-medium">Category</th>
                <th className="p-4 font-medium">Duration</th>
                <th className="p-4 font-medium">Price</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {services.map((service) => (
                <tr key={service.id} className="border-b border-surface-50 dark:border-surface-800/50 last:border-0">
                  <td className="p-4 font-medium text-surface-800 dark:text-surface-100">{service.name}</td>
                  <td className="p-4"><Badge variant="neutral">{categoryName(service.categorySlug)}</Badge></td>
                  <td className="p-4 text-surface-500 dark:text-surface-400">{service.duration}</td>
                  <td className="p-4 font-semibold text-brand-600 dark:text-brand-400">{formatCurrency(service.price)}</td>
                  <td className="p-4 text-right">
                    <div className="flex justify-end gap-1">
                      <button onClick={() => openEdit(service)} className="rounded-lg p-1.5 text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-800">
                        <Pencil size={14} />
                      </button>
                      <button onClick={() => handleDelete(service.id)} className="rounded-lg p-1.5 text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editing ? 'Edit service' : 'Add service'}>
        <div className="space-y-4">
          <Input label="Service name" placeholder="e.g. Tap repair" value={name} onChange={(e) => setName(e.target.value)} />
          <Select label="Category" placeholder="Select category" value={categorySlug} onChange={(e) => setCategorySlug(e.target.value)} options={dummyCategories.map((c) => ({ label: c.name, value: c.slug }))} />
          <Input label="Price (PKR)" type="number" placeholder="500" value={price} onChange={(e) => setPrice(e.target.value)} />
          <Input label="Estimated duration" placeholder="e.g. 30 min" value={duration} onChange={(e) => setDuration(e.target.value)} />
          <div className="flex gap-2">
            <Button variant="outline" className="flex-1" onClick={() => setIsModalOpen(false)}><X size={14} /> Cancel</Button>
            <Button className="flex-1" onClick={handleSave}>Save</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}