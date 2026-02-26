import { useState, useRef } from 'react';
import { uploadImage } from '@/lib/upload';

const MAX_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED = ['image/jpeg', 'image/png', 'image/webp'];

export interface ImageFieldProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  storagePath: string;
}

export function ImageField({ label, value, onChange, storagePath }: ImageFieldProps) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setError(null);
    if (file.size > MAX_SIZE) {
      setError('File size exceeds 5MB');
      return;
    }
    if (!ACCEPTED.includes(file.type)) {
      setError('Only JPEG, PNG, WebP allowed');
      return;
    }
    setUploading(true);
    setProgress(0);
    try {
      const path = `${storagePath}/${Date.now()}-${file.name}`;
      const url = await uploadImage(file, path, (percent) => setProgress(percent));
      onChange(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setUploading(false);
      setProgress(0);
      if (inputRef.current) inputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-stone-700">{label}</label>
      {value && (
        <a
          href={value}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block rounded border border-sand overflow-hidden focus:ring-2 ring-maroon/30"
        >
          <img
            src={value}
            alt="preview"
            className="h-[120px] w-[160px] object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
        </a>
      )}
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-sand bg-cream px-4 py-2 text-stone-900"
        placeholder="URL or path (e.g. /assets/images/hero.png)"
        dir="ltr"
      />
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={handleFileChange}
        className="hidden"
      />
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={uploading}
        className="rounded-lg bg-maroon text-white px-4 py-2 text-sm disabled:opacity-60 hover:bg-maroon-dark transition-colors"
      >
        {uploading ? `Uploading… ${Math.round(progress)}%` : 'Upload'}
      </button>
      {uploading && (
        <div className="h-1.5 w-full rounded-full bg-sand overflow-hidden">
          <div
            className="h-full bg-maroon transition-all duration-200"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}
