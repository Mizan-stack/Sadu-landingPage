/**
 * Dashboard app: AuthProvider, React Router, protected routes, layout.
 */
import { lazy } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext';
import { PreferencesProvider } from '@/contexts/PreferencesContext';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { Layout } from '@/components/Layout';
import { Login } from '@/pages/Login';

const DashboardHome = lazy(() =>
  import('@/pages/DashboardHome').then((m) => ({ default: m.DashboardHome }))
);
const Global = lazy(() =>
  import('@/pages/Global').then((m) => ({ default: m.Global }))
);
const Sections = lazy(() =>
  import('@/pages/Sections').then((m) => ({ default: m.Sections }))
);
const SectionDetail = lazy(() =>
  import('@/pages/SectionDetail').then((m) => ({ default: m.SectionDetail }))
);
const Contact = lazy(() =>
  import('@/pages/Contact').then((m) => ({ default: m.Contact }))
);
const Analytics = lazy(() =>
  import('@/pages/Analytics').then((m) => ({ default: m.Analytics }))
);
const ImageLibrary = lazy(() =>
  import('@/pages/ImageLibrary').then((m) => ({ default: m.ImageLibrary }))
);

function ProtectedLayout() {
  return (
    <ProtectedRoute>
      <Layout />
    </ProtectedRoute>
  );
}

function App() {
  return (
    <AuthProvider>
      <PreferencesProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route element={<ProtectedLayout />}>
              <Route path="/" element={<DashboardHome />} />
              <Route path="/global" element={<Global />} />
              <Route path="/sections" element={<Sections />} />
              <Route path="/sections/:sectionId" element={<SectionDetail />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/library" element={<ImageLibrary />} />
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </PreferencesProvider>
    </AuthProvider>
  );
}

export default App;
