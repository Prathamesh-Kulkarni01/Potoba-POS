import { auth } from '@/auth';  // Ensure your auth utility is correctly imported
import { redirect } from 'next/navigation';

export default async function Dashboard() {
  const session = await auth();

  // Type-checking to access `user` safely
  const user = session?.user;

  if (!user) {
    return redirect('/');
  } else {
    return redirect('/dashboard/overview');
  }
}
