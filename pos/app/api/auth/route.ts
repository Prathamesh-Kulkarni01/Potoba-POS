import { NextResponse } from 'next/server';
import { auth } from '@/auth';  // Ensure this module is server-compatible

export async function GET() {
  const session = await auth();
  return NextResponse.json(session);
}
