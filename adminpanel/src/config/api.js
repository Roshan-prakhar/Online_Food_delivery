const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

export const FOOD_API_URL = `${API_BASE_URL}/foods`;
export const ORDER_API_URL = `${API_BASE_URL}/orders`;
