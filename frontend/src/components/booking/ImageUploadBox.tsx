import { useRef, useState } from 'react';
import { ImagePlus, X } from 'lucide-react';

export function ImageUploadBox({
  images,
  onChange,
  maxImages = 3,
}: {
  images: string[];
  onChange: (images: string[]) => void;
  maxImages?: number;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    const remaining = maxImages - images.length;
    const newFiles = Array.from(files).slice(0, remaining);
    const urls = newFiles.map((file) => URL.createObjectURL(file));
    onChange([...images, ...urls]);
  };

  const removeImage = (idx: number) => {
    onChange(images.filter((_, i) => i !== idx));
  };

  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-surface-700 dark:text-surface-300">
        Upload photos of the problem
      </label>

      <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
        {images.map((img, idx) => (
          <div key={idx} className="group relative aspect-square overflow-hidden rounded-xl border border-surface-100 dark:border-surface-800">
            <img src={img} alt="" className="h-full w-full object-cover" />
            <button
              type="button"
              onClick={() => removeImage(idx)}
              className="absolute right-1.5 top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-black/60 text-white opacity-0 transition-opacity group-hover:opacity-100"
            >
              <X size={13} />
            </button>
          </div>
        ))}

        {images.length < maxImages && (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={(e) => { e.preventDefault(); setIsDragging(false); handleFiles(e.dataTransfer.files); }}
            className={`flex aspect-square flex-col items-center justify-center gap-1.5 rounded-xl border-2 border-dashed text-surface-400 transition-colors ${
              isDragging ? 'border-brand-400 bg-brand-50 dark:bg-brand-950' : 'border-surface-200 dark:border-surface-700 hover:border-brand-300'
            }`}
          >
            <ImagePlus size={20} />
            <span className="text-[10px] font-medium">Add photo</span>
          </button>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />
      <p className="mt-2 text-xs text-surface-400">Up to {maxImages} photos. This helps match the right technician.</p>
    </div>
  );
}