"use client"
import { auth } from '@/auth';  // Ensure your auth utility is correctly imported
import { useUser } from '@/hooks/useUser';
import { redirect } from 'next/navigation';


export default  function Dashboard() {
  // const session = await auth();

  // Type-checking to access `user` safely
  const { user } = useUser();

  if (!user) {
    return redirect('/');
  } else if (!user.selectedRestaurant) {
    return redirect('/restaurants/onboard');
  } else {
    return redirect('/dashboard/overview');
  }
}
