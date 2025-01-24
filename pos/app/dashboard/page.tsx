'use client';
import { useRouter } from 'next/navigation';
import { useUser } from '@/hooks/useUser';
import { useEffect } from 'react';
import { toast } from 'sonner';

export default function Dashboard() {
  const router = useRouter();
  const { token, user, loading } = useUser();

  useEffect(() => {
    if (loading) return;

    if (!token) {
      toast.error('No token found, redirecting to home page.');
      router.push('/');
    } else if (!user?.selectedRestaurant) {
      toast.info('No selected restaurant, redirecting to restaurants page.');
      router.push('/dashboard/restaurants');
    } else {
      toast.success('Redirecting to dashboard overview.');
      router.push('/dashboard/overview');
    }
  }, [loading, token, user, router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return null;
}
