import { get, post, put } from '../services/apiService';

export async function createOrder(restaurantId: string, body: any) {
    return post(`/orders/${restaurantId}`, body);
}

export async function updateOrderStatus(restaurantId: string, orderId: string, body: any) {
    return put(`/orders/${restaurantId}/orders/${orderId}/status`, body);
}

export async function listOrders(restaurantId: string) {
    return get(`/orders/${restaurantId}/orders`);
}

export async function getOrderById(restaurantId: string, orderId: string) {
    return get(`/orders/${restaurantId}/orders/${orderId}`);
}
