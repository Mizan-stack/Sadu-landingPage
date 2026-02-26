/**
 * Image Library: grid of images with preview, rename, upload.
 */
import { useState, useEffect, useRef } from 'react';
import {
  listImages,
  addImage,
  renameImage,
  deleteImage,
  type LibraryImage,
} from '@/lib/imageLibrary';
import { usePreferences } from '@/contexts/PreferencesContext';

const MAX_SIZE = 5 * 1024 * 1024;
const ACCEPTED = ['image/jpeg', 'image/png', 'image/webp'];

export function ImageLibrary() {
  const [images, setImages] = useState<LibraryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [preview, setPreview] = useState<LibraryImage | null>(null);
  const [editing, setEditing] = useState<LibraryImage | null>(null);
  const [editName, setEditName] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const list = await listImages();
      setImages(list);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load images');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void load();
  }, []);

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
      setImages((prev) => [img, ...prev]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setUploading(false);
      setProgress(0);
      if (inputRef.current) inputRef.current.value = '';
    }
  };

  const handleRename = async () => {
    if (!editing || !editName.trim()) return;
    try {
      await renameImage(editing.id, editName.trim());
      setImages((prev) =>
        prev.map((i) => (i.id === editing.id ? { ...i, name: editName.trim() } : i))
      );
      setEditing(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Rename failed');
    }
  };

  const { t } = usePreferences();

  const handleDelete = async (img: LibraryImage) => {
    if (!confirm(t('deleteConfirm').replace('{name}', img.name))) return;
    try {
      await deleteImage(img.id);
      setImages((prev) => prev.filter((i) => i.id !== img.id));
      if (preview?.id === img.id) setPreview(null);
      if (editing?.id === img.id) setEditing(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Delete failed');
    }
  };

  const openRename = (img: LibraryImage) => {
    setEditing(img);
    setEditName(img.name);
  };

  if (loading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <div className="animate-spin h-10 w-10 rounded-full border-2 border-maroon border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold text-maroon dark:text-maroon-light">{t('imageLibraryTitle')}</h1>
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
            className="rounded-lg bg-maroon px-4 py-2 text-white text-sm font-medium hover:bg-maroon-dark disabled:opacity-60 transition-colors"
          >
            {uploading ? `${t('uploading')} ${Math.round(progress)}%` : `+ ${t('uploadNew')}`}
          </button>
        </div>
      </div>

      {error && (
        <div className="rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 px-4 py-2 text-red-700 dark:text-red-400 text-sm">
          {error}
        </div>
      )}

      {uploading && (
        <div className="h-1.5 w-full rounded-full bg-sand dark:bg-stone-600 overflow-hidden">
          <div
            className="h-full bg-maroon transition-all duration-200"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      {images.length === 0 ? (
        <div className="rounded-xl border-2 border-dashed border-sand dark:border-stone-600 bg-cream/50 dark:bg-stone-800/50 py-16 text-center text-stone-500 dark:text-stone-400">
          <p className="mb-4">{t('noImages')}</p>
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="text-maroon dark:text-maroon-light hover:underline font-medium"
          >
            {t('uploadFirst')}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {images.map((img) => (
            <div
              key={img.id}
              className="group rounded-xl border border-sand dark:border-stone-600 bg-white dark:bg-stone-800 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <button
                type="button"
                onClick={() => setPreview(img)}
                className="block w-full aspect-square overflow-hidden bg-stone-100 dark:bg-stone-700 focus:ring-2 ring-maroon/30 focus:outline-none"
              >
                <img
                  src={img.downloadUrl}
                  alt={img.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                />
              </button>
              <div className="p-3">
                {editing?.id === img.id ? (
                  <div className="flex gap-1">
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleRename()}
                      className="flex-1 rounded border border-sand dark:border-stone-600 bg-white dark:bg-stone-700 px-2 py-1 text-sm text-stone-800 dark:text-stone-100"
                      autoFocus
                    />
                    <button
                      type="button"
                      onClick={handleRename}
                      className="rounded bg-maroon text-white px-2 py-1 text-sm"
                    >
                      {t('save')}
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditing(null)}
                      className="rounded bg-sand dark:bg-stone-600 px-2 py-1 text-sm text-stone-800 dark:text-stone-200"
                    >
                      {t('cancel')}
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-medium text-stone-800 dark:text-stone-200 truncate" title={img.name}>
                      {img.name}
                    </span>
                    <div className="flex shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        type="button"
                        onClick={() => openRename(img)}
                        className="p-1 rounded hover:bg-sand dark:hover:bg-stone-600 text-stone-500 dark:text-stone-400"
                        title={t('rename')}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(img)}
                        className="p-1 rounded hover:bg-red-50 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400"
                        title={t('delete')}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Full-size preview modal */}
      {preview && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setPreview(null)}
        >
          <div
            className="relative max-w-4xl max-h-[90vh] w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={preview.downloadUrl}
              alt={preview.name}
              className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
            />
            <div className="mt-4 flex items-center justify-between text-white">
              <span className="font-medium">{preview.name}</span>
              <button
                type="button"
                onClick={() => setPreview(null)}
                className="rounded bg-white/20 px-4 py-2 hover:bg-white/30"
              >
                {t('close')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
