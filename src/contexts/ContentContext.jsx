import { createContext, useContext } from 'react';
import { useContent } from '../hooks/useContent';

const ContentContext = createContext(null);

export function ContentProvider({ children }) {
  const value = useContent();
  return (
    <ContentContext.Provider value={value}>
      {children}
    </ContentContext.Provider>
  );
}

export function useContentContext() {
  const ctx = useContext(ContentContext);
  if (!ctx) throw new Error('useContentContext must be used within ContentProvider');
  return ctx;
}
