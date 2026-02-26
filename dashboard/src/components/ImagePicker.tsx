/**
 * Image picker: select from library or upload new. Replaces raw URL input.
 */
import { useState, useEffect, useRef } from 'react';
import {
  listImages,
  addImage,
  type LibraryImage,
} from '@/lib/imageLibrary';

const MAX_SIZE = 5 * 1024 * 1024;
const ACCEPTED = ['image/jpeg', 'image/png', 'image/webp'];

export interface ImagePickerProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
}

export function ImagePicker({ label, value, onChange }: ImagePickerProps) {
  const [open, setOpen] = useState(false);
  const [library, setLibrary] = useState<LibraryImage[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const loadLibrary = async () => {
    setLoading(true);
    setError(null);
    try {
      const list = await listImages();
      setLibrary(list);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load library');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (open) void loadLibrary();
  }, [open]);

  const handleSelect = (img: LibraryImage) => {
    onChange(img.downloadUrl);
    setOpen(false);
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > MAX_SIZE) {
      setError('File size exceeds 5MB');
      return;
    }
    if (!ACCEPTED.includes(file.type)) {
      setError('Only JPEG, PNG, WebP allowed');
      return;
    }
    setError(null);
    setUploading(true);
    setProgress(0);
    try {
      const img = await addImage(file, file.name.replace(/\.[^.]+$/, ''), (p) => setProgress(p));
      onChange(img.downloadUrl);
      setLibrary((prev) => [img, ...prev]);
      setOpen(false);
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
      <label className="block text-sm font-medium text-stone-700 dark:text-stone-300">{label}</label>
      <div className="flex flex-wrap items-center gap-3">
        {value && (
          <div className="rounded-lg border border-sand dark:border-stone-600 overflow-hidden shrink-0">
            <img
              src={value}
              alt=""
              className="h-[100px] w-[140px] object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          </div>
        )}
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="rounded-lg bg-maroon px-4 py-2 text-white text-sm font-medium hover:bg-maroon-dark transition-colors"
          >
            {value ? 'Change image' : 'Pick image'}
          </button>
          {value && (
            <button
              type="button"
              onClick={() => onChange('')}
              className="rounded-lg border border-sand dark:border-stone-600 px-4 py-2 text-stone-600 dark:text-stone-400 text-sm hover:bg-sand dark:hover:bg-stone-600 transition-colors"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Picker modal */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          onClick={() => !uploading && setOpen(false)}
        >
          <div
            className="bg-white dark:bg-stone-800 rounded-xl shadow-xl max-w-4xl w-full max-h-[85vh] overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 border-b border-sand dark:border-stone-600">
              <h2 className="text-lg font-semibold text-maroon dark:text-maroon-light">Pick from library</h2>
              <div className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handleUpload}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => inputRef.current?.click()}
                  disabled={uploading}
                  className="rounded-lg bg-maroon px-4 py-2 text-white text-sm disabled:opacity-60"
                >
                  {uploading ? `Uploading… ${Math.round(progress)}%` : '+ Upload new'}
                </button>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="rounded-lg border border-sand dark:border-stone-600 px-4 py-2 text-stone-600 dark:text-stone-400 text-sm hover:bg-sand dark:hover:bg-stone-600"
                >
                  Cancel
                </button>
              </div>
            </div>
            {uploading && (
              <div className="h-1 w-full bg-sand dark:bg-stone-600 overflow-hidden">
                <div
                  className="h-full bg-maroon transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
            )}
            {error && (
              <div className="mx-4 mt-2 rounded bg-red-50 dark:bg-red-900/20 px-3 py-2 text-red-700 dark:text-red-400 text-sm">
                {error}
              </div>
            )}
            <div className="flex-1 overflow-auto p-4">
              {loading ? (
                <div className="flex justify-center py-12">
                  <div className="animate-spin h-10 w-10 rounded-full border-2 border-maroon border-t-transparent" />
                </div>
              ) : library.length === 0 ? (
                <div className="text-center py-12 text-stone-500 dark:text-stone-400">
                  <p className="mb-4">No images in library.</p>
                  <button
                    type="button"
                    onClick={() => inputRef.current?.click()}
                    className="text-maroon hover:underline font-medium"
                  >
                    Upload your first image
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                  {library.map((img) => (
                    <button
                      key={img.id}
                      type="button"
                      onClick={() => handleSelect(img)}
                      className={`rounded-lg border-2 overflow-hidden transition-all hover:border-maroon focus:ring-2 ring-maroon/30 focus:outline-none ${
                        value === img.downloadUrl ? 'border-maroon ring-2 ring-maroon/30' : 'border-sand dark:border-stone-600'
                      }`}
                    >
                      <img
                        src={img.downloadUrl}
                        alt={img.name}
                        className="w-full aspect-square object-cover"
                      />
                      <div className="p-2 bg-cream dark:bg-stone-700 text-left">
                        <span className="text-xs font-medium text-stone-700 dark:text-stone-300 truncate block">
                          {img.name}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
