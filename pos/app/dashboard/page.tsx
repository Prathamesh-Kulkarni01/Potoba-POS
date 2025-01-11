"use client"
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

export default function Dashboard() {
  const router = useRouter();
  const { data: session } = useSession();

  if (session === undefined) return null;

  if (!session || !session.user) {
    router.push('/');
  } else if (!session.user.selectedRestaurant) {
    router.push('/restaurants/onboard');
  } else {
    router.push('/dashboard/overview');
  }

  return null;
}
