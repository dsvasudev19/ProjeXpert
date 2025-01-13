import { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

const WithAuth = ({ children }: any) => {
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && user === null && !window.location.pathname.startsWith('/auth')) {
      window.location.href = '/auth/login';
    }
  }, [loading, user]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  if (user === null && !window.location.pathname.startsWith('/auth')) {
    return null;
  }

  return <>{children}</>;
};

export default WithAuth;
