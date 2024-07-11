// components/protectRoute.js or components/protectRoute.tsx
"use client"
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAuth } from '@/contexts/auth-context';

const ProtectRoute = (WrappedComponent) => {
  const ProtectedComponent = (props) => {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!loading && !user) {
        const returnUrl = encodeURIComponent(router.asPath);
        router.push(`/login?returnUrl=${returnUrl}`);
      }
    }, [loading, user, router]);

    if (loading || !user) {
      return null; // or loading indicator
    }

    return <WrappedComponent {...props} />;
  };

  return ProtectedComponent;
};

export default ProtectRoute;
