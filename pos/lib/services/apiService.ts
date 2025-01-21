"use server"
import { getToken } from 'next-auth/jwt';
import { headers } from 'next/headers';

const BASE_URL = process.env.BACKEND_API_URL;

async function fetchAPI(endpoint: string, options: RequestInit = {}) {
  // Retrieve the token from the session or cookies using getToken
  const reqHeaders = headers();
  const token = await getToken({ req: { headers: reqHeaders }, secret: process.env.AUTH_SECRET,cookieName: process.env.NODE_ENV === 'production' ? '__Secure-next-auth.session-token' : 'next-auth.session-token' });

  const authHeaders = {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token?.token||""}` }),
  };

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: { ...authHeaders, ...options.headers },
  });


  if (!response) {
    throw new Error(`API request failed: ${response}`);
  }

  return  response
}

export async function post(endpoint: string, body: any) {
  return fetchAPI(endpoint, {
    method: 'POST',
    body: JSON.stringify(body),
  });
}

export async function get(endpoint: string) {
  return fetchAPI(endpoint, {
    method: 'GET',
  });
}

export async function put(endpoint: string, body: any) {
  return fetchAPI(endpoint, {
    method: 'PUT',
    body: JSON.stringify(body),
  });
}

export async function del(endpoint: string) {
  return fetchAPI(endpoint, {
    method: 'DELETE',
  });
}
