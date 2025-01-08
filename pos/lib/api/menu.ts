import { get, post, put, del } from '../services/apiService';

export async function createMenuItem(restaurantId: string, body: any) {
    return post(`/menu/${restaurantId}/items`, body);
  }
  
  export async function getMenuItems(restaurantId: string) {
    return get(`/menu/${restaurantId}/items`);
  }
  
  export async function getMenuItem(restaurantId: string, itemId: string) {
    return get(`/menu/${restaurantId}/items/${itemId}`);
  }
  
  export async function updateMenuItem(restaurantId: string, itemId: string, body: any) {
    return put(`/menu/${restaurantId}/items/${itemId}`, body);
  }
  
  export async function deleteMenuItem(restaurantId: string, itemId: string) {
    return del(`/menu/${restaurantId}/items/${itemId}`);
  }