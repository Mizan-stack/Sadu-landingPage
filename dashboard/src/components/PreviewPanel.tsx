import { useState, useEffect } from 'react';

type DeviceSize = 'desktop' | 'tablet' | 'mobile';

const DEVICE_WIDTHS: Record<DeviceSize, string> = {
  desktop: '100%',
  tablet: '768px',
  mobile: '375px',
};

interface PreviewPanelProps {
  siteUrl: string;
  highlightSection?: string;
  refreshKey?: number;
}

export function PreviewPanel({ siteUrl, highlightSection, refreshKey = 0 }: PreviewPanelProps) {
  const [device, setDevice] = useState<DeviceSize>('desktop');
  const [loading, setLoading] = useState(true);
  const [iframeKey, setIframeKey] = useState(refreshKey);

  useEffect(() => {
    setIframeKey(refreshKey);
    setLoading(true);
  }, [refreshKey]);

  const base = siteUrl.replace(/#.*$/, '');
  const hash = highlightSection ? `#${highlightSection}` : '';
  const cacheBust = `_t=${refreshKey}`;
  const sectionParam = highlightSection ? `&section=${highlightSection}` : '';
  const sep = base.includes('?') ? '&' : '?';
  const url = `${base}${sep}${cacheBust}${sectionParam}${hash}`;

  const handleRefresh = () => {
    setIframeKey((k) => k + 1);
    setLoading(true);
  };

  return (
    <div className="flex flex-col h-full rounded-xl border border-sand shadow-lg overflow-hidden bg-cream">
      <div className="flex items-center justify-between p-2 border-b border-sand bg-white">
        <div className="flex gap-1">
          {(['desktop', 'tablet', 'mobile'] as const).map((d) => (
            <button
              key={d}
              type="button"
              onClick={() => setDevice(d)}
              className={`px-3 py-1 rounded text-sm ${device === d ? 'bg-maroon text-white' : 'bg-sand text-stone-600'}`}
            >
              {d.charAt(0).toUpperCase() + d.slice(1)}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={handleRefresh}
          className="p-2 rounded hover:bg-sand text-stone-600"
          title="Refresh preview"
          aria-label="Refresh preview"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </button>
      </div>
      <div
        className="flex-1 overflow-auto p-4 flex justify-center"
        style={{ minHeight: 'calc(100vh - 200px)' }}
      >
        <div
          className="relative bg-white rounded-lg overflow-hidden shadow-inner"
          style={{ width: DEVICE_WIDTHS[device], maxWidth: '100%' }}
        >
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-cream z-10">
              <div className="animate-spin rounded-full h-10 w-10 border-2 border-maroon border-t-transparent" aria-hidden />
            </div>
          )}
          <iframe
            key={`${iframeKey}-${highlightSection ?? ''}`}
            src={url}
            title="Website preview"
            className="w-full border-0"
            style={{ height: 'calc(100vh - 220px)', minHeight: 500 }}
            onLoad={() => setLoading(false)}
          />
        </div>
      </div>
    </div>
  );
}
