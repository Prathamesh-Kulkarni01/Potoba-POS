'use client';
import { useRouter } from 'next/navigation';
import { useUser } from '@/hooks/useUser';
import { useEffect } from 'react';

export default function Dashboard() {
  const router = useRouter();
  const { token, user, loading } = useUser();

  useEffect(() => {
    if (!loading) {
      if (!token) {
        router.push('/');
      } else if (!user?.selectedRestaurant) {
        router.push('/dashboard/restaurants');
      } else {
        router.push('/dashboard/overview');
      }
    }
  }, [loading, token, user, router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return null;
}
