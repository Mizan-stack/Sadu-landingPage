/**
 * Shows a loading bar at the top when navigating between routes.
 */
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export function NavigationLoader() {
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [prevPath, setPrevPath] = useState(location.pathname);

  useEffect(() => {
    if (location.pathname !== prevPath) {
      setPrevPath(location.pathname);
      setLoading(true);
      const t = setTimeout(() => setLoading(false), 600);
      return () => clearTimeout(t);
    }
  }, [location.pathname, prevPath]);

  if (!loading) return null;

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[100] h-1 bg-maroon/20 overflow-hidden"
      role="progressbar"
      aria-label="Loading"
    >
      <div
        className="h-full w-1/4 bg-maroon"
        style={{ animation: 'navigationLoader 0.6s ease-in-out forwards' }}
      />
    </div>
  );
}
