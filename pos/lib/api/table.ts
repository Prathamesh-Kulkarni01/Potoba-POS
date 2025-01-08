import { get, post, put } from '../services/apiService';

export async function createTable(restaurantId: string, body: any) {
    return post(`/tables/${restaurantId}`, body);
}

export async function updateTableStatus(restaurantId: string, tableId: string, body: any) {
    return put(`/tables/${restaurantId}/tables/${tableId}/status`, body);
}

export async function listTables(restaurantId: string) {
    return get(`/tables/${restaurantId}/tables`);
}

export async function getTableById(restaurantId: string, tableId: string) {
    return get(`/tables/${restaurantId}/tables/${tableId}`);
}
