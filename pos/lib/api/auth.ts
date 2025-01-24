"use server";
import { get, post, put } from '../services/apiService';
import { cookies } from 'next/headers';

async function handleLogin(endpoint: string, body: any) {
  const response = await post(endpoint, body);
  if (response.token) {
    cookies().set(
      process.env.NODE_ENV === 'production' ? '__Secure-next-auth.session-token' : 'next-auth.session-token',
      response.token,
      { httpOnly: true, secure: process.env.NODE_ENV === 'production', path: '/', sameSite: 'strict' }
    );
  }
  return response;
}

export async function registerOwner(body: any) {
  return post('/auth/register/owner', body);
}

export async function registerStaff(body: any) {
  return post('/auth/register/staff', body);
}

export async function registerKitchen(body: any) {
  return post('/auth/register/kitchen', body);
}

export async function registerCustomer(body: any) {
  return post('/auth/register/customer', body);
}

export async function registerAdmin(body: any) {
  return post('/auth/register/admin', body);
}

export async function loginOwner(body: any) {
  return handleLogin('/auth/login/owner', body);
}

export async function loginStaff(body: any) {
  return handleLogin('/auth/login/staff', body);
}

export async function loginKitchen(body: any) {
  return handleLogin('/auth/login/kitchen', body);
}

export async function loginCustomer(body: any) {
  return handleLogin('/auth/login/customer', body);
}

export async function loginAdmin(body: any) {
  return handleLogin('/auth/login/admin', body);
}

export async function getProfile() {
  return get('/auth/profile');
}

export async function updateProfile(userId:string,body: any) {
  return put(`/auth/update/${userId}`,body);
}
