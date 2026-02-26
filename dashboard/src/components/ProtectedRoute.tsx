/**
 * Wraps routes that require authentication. Redirects to /login when user is null.
 * Shows a loading spinner while auth state is resolving.
 */
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center bg-cream"
        role="status"
        aria-label="Loading"
      >
        <div className="w-10 h-10 border-2 border-maroon border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (user == null) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}
