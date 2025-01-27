import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900">404</h1>
        <h2 className="mt-4 text-2xl font-semibold text-gray-600">Site Not Found</h2>
        <p className="mt-2 text-gray-500">
          The subdomain you're looking for doesn't exist or hasn't been created yet.
        </p>
        <Button asChild className="mt-8">
          <Link href="/">
            Return Home
          </Link>
        </Button>
      </div>
    </div>
  );
}