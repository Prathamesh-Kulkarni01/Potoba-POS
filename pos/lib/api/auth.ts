import { get, post, put } from '../services/apiService';

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
  return post('/auth/login/owner', body);
}

export async function loginStaff(body: any) {
  return post('/auth/login/staff', body);
}

export async function loginKitchen(body: any) {
  return post('/auth/login/kitchen', body);
}

export async function loginCustomer(body: any) {
  return post('/auth/login/customer', body);
}

export async function loginAdmin(body: any) {
  return post('/auth/login/admin', body);
}

export async function getProfile() {
  return get('/auth/profile');
}

export async function updateProfile(userId:string,body: any) {
  return put(`/auth/update/${userId}`,body);
}
