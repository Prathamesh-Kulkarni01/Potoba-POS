"use server";
// import { auth } from '@/auth';
// import { updateSessionUser } from './sessionService';

const BASE_URL = process.env.BACKEND_API_URL ;

async function fetchAPI(endpoint: string, options: RequestInit) {
  // const session = await auth();
  interface Session {
    user?: {
      token?: string;
      role?: string;
    };
  }

  const session: Session = {};
  const token = session?.user?.token;
  const role = (session?.user as any)?.role;
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
    ...(token && { 'Authorization': `Bearer ${token}` }),
    ...(role && { 'Role': role }),
  };
  const response = await fetch(`${BASE_URL}${endpoint}`, { ...options, headers });
  if (!response.ok) {
    const errorData = await response.json();
    // throw new Error(errorData.message || 'API request failed');
  }
  const data = await response.json();

  // // Update session user if the user data is updated
  // if (data.user) {
  //   await updateSessionUser(data.user);
  // }

  return data;
}

export async function post(endpoint: string, body: any) {
  console.log({body})
  return fetchAPI(endpoint, {
    method: 'POST',
    headers: {},
    body: JSON.stringify(body),
  });
}

export async function get(endpoint: string) {
  return fetchAPI(endpoint, {
    method: 'GET',
    headers: {},
  });
}

export async function put(endpoint: string, body: any) {
  return fetchAPI(endpoint, {
    method: 'PATCH',
    headers: {},
    body: JSON.stringify(body),
  });
}

export async function del(endpoint: string) {
  return fetchAPI(endpoint, {
    method: 'DELETE',
    headers: {},
  });
}

