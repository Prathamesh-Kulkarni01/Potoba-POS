'use server';

import getServerToken from "../utils/getServerToken";


const BASE_URL = process.env.BACKEND_API_URL;

async function fetchAPI(endpoint: string, options: RequestInit = {}) {
  // const cookieToken = cookies().get(process.env.NODE_ENV === 'production' ? '__Secure-next-auth.session-token' : 'next-auth.session-token');
  const token = getServerToken();

  const authHeaders = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` })
  };

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: { ...authHeaders, ...options.headers }
  });

  if (!response.ok) {
    // throw new Error(`API request failed: ${response.statusText}`);
  }

  return await response.json();
}

export async function post(endpoint: string, body: any) {
  return fetchAPI(endpoint, {
    method: 'POST',
    body: JSON.stringify(body)
  });
}

export async function get(endpoint: string) {
  return fetchAPI(endpoint, {
    method: 'GET'
  });
}

export async function put(endpoint: string, body: any) {
  return fetchAPI(endpoint, {
    method: 'PUT',
    body: JSON.stringify(body)
  });
}

export async function del(endpoint: string) {
  return fetchAPI(endpoint, {
    method: 'DELETE'
  });
}
