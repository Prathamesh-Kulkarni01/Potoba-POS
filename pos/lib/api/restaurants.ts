import { get, post, put } from '../services/apiService';

export async function listRestaurants() {
  return get('/restaurants');
}

export async function createRestaurant(body: any) {
  console.log({body})
  return post('/restaurants', body);
}

export async function getRestaurantDetails(restaurantId: string) {
  return get(`/restaurants/${restaurantId}`);
}

export async function updateRestaurantDetails(restaurantId: string, body: any) {
  return put(`/restaurants/${restaurantId}`, body);
}
