/**
 * Load and cache the site config from Firestore. Single doc at sites/sdu-boutique/config.
 */
import { useState, useEffect, useCallback } from 'react';
import { loadConfig } from '@/lib/config';
import type { SiteConfig } from '@/types/content';

export function useConfig(): {
  config: SiteConfig | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
} {
  const [config, setConfig] = useState<SiteConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await Promise.race([
        loadConfig(),
        new Promise<null>((_, reject) =>
          setTimeout(() => reject(new Error('Request timed out. Check Firestore rules and network.')), 15000)
        ),
      ]);
      setConfig(data);
    } catch (e) {
      const message = e instanceof Error ? e.message : 'Failed to load config';
      setError(message);
      console.error('useConfig load error', e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refetch();
  }, [refetch]);

  return { config, loading, error, refetch };
}
