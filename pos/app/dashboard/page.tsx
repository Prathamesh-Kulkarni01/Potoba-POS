'use client';
import { useRouter } from 'next/navigation';
import { useUser } from '@/hooks/useUser';

export default function Dashboard() {
  const router = useRouter();
  const { token, user } = useUser();
console.log({token})
  if (!token) {
    router.push('/');
  } else if (!user?.selectedRestaurant) {
    router.push('/restaurants/onboard');
  } else {
    router.push('/dashboard/overview');
  }

  return null;
}
