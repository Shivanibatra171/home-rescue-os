import { useState } from 'react';
import toast from 'react-hot-toast';
import { Plus, Pencil, Trash2, X } from 'lucide-react';
import {
  Wrench, Zap, Snowflake, Hammer, PaintBucket, Flame, WashingMachine, Sparkles, Home, Siren,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Modal } from '@/components/ui/Modal';
import { EmptyState } from '@/components/ui/EmptyState';
import { dummyCategories } from '@/data/dummyCategories';
import { formatCurrency } from '@/utils/formatCurrency';
import type { Category } from '@/types';

const iconMap: Record<string, React.ElementType> = {
  Wrench, Zap, Snowflake, Hammer, PaintBucket, Flame, WashingMachine, Sparkles, Home, Siren,
};

export default function ManageCategories() {
  const [categories, setCategories] = useState<Category[]>(dummyCategories);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [formName, setFormName] = useState('');
  const [formDesc, setFormDesc] = useState('');
  const [formPrice, setFormPrice] = useState('');

  const openAddModal = () => {
    setEditingCategory(null);
    setFormName('');
    setFormDesc('');
    setFormPrice('');
    setIsModalOpen(true);
  };

  const openEditModal = (category: Category) => {
    setEditingCategory(category);
    setFormName(category.name);
    setFormDesc(category.description);
    setFormPrice(String(category.startingPrice));
    setIsModalOpen(true);
  };

  const handleSave = () => {
    if (!formName.trim()) {
      toast.error('Category name is required');
      return;
    }
    if (editingCategory) {
      setCategories((prev) => prev.map((c) => (c.id === editingCategory.id ? { ...c, name: formName, description: formDesc, startingPrice: Number(formPrice) || 0 } : c)));
      toast.success('Category updated');
    } else {
      const newCategory: Category = {
        id: `cat-${Date.now()}`,
        name: formName,
        slug: formName.toLowerCase().replace(/\s+/g, '-'),
        icon: 'Home',
        description: formDesc,
        workerCount: 0,
        startingPrice: Number(formPrice) || 0,
        color: '#1fa76b',
      };
      setCategories((prev) => [...prev, newCategory]);
      toast.success('Category added');
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    setCategories((prev) => prev.filter((c) => c.id !== id));
    toast.success('Category deleted');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-surface-900 dark:text-surface-50">Manage categories</h1>
          <p className="mt-1 text-sm text-surface-500 dark:text-surface-400">{categories.length} service categories</p>
        </div>
        <Button leftIcon={<Plus size={16} />} onClick={openAddModal}>Add Category</Button>
      </div>

      {categories.length === 0 ? (
        <EmptyState title="No categories yet" message="Add your first service category to get started." />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => {
            const Icon = iconMap[category.icon] ?? Home;
            return (
              <div key={category.id} className="rounded-2xl border border-surface-100 dark:border-surface-800 bg-white dark:bg-surface-900 p-5">
                <div className="flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl" style={{ backgroundColor: `${category.color}18`, color: category.color }}>
                    <Icon size={22} />
                  </div>
                  <div className="flex gap-1">
                    <button onClick={() => openEditModal(category)} className="rounded-lg p-1.5 text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-800">
                      <Pencil size={14} />
                    </button>
                    <button onClick={() => handleDelete(category.id)} className="rounded-lg p-1.5 text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
                <h3 className="mt-3 font-display font-semibold text-surface-900 dark:text-surface-50">{category.name}</h3>
                <p className="mt-1 text-sm text-surface-500 dark:text-surface-400">{category.description}</p>
                <div className="mt-3 flex items-center justify-between text-xs">
                  <span className="text-surface-400">{category.workerCount} pros</span>
                  <span className="font-semibold text-brand-600 dark:text-brand-400">From {formatCurrency(category.startingPrice)}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingCategory ? 'Edit category' : 'Add category'}>
        <div className="space-y-4">
          <Input label="Category name" placeholder="e.g. Pest Control" value={formName} onChange={(e) => setFormName(e.target.value)} />
          <Textarea label="Description" placeholder="Short description of this service..." value={formDesc} onChange={(e) => setFormDesc(e.target.value)} />
          <Input label="Starting price (PKR)" type="number" placeholder="500" value={formPrice} onChange={(e) => setFormPrice(e.target.value)} />
          <div className="flex gap-2">
            <Button variant="outline" className="flex-1" onClick={() => setIsModalOpen(false)}><X size={14} /> Cancel</Button>
            <Button className="flex-1" onClick={handleSave}>Save</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}