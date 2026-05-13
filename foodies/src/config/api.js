const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

export const AUTH_API_URL = `${API_BASE_URL}`;
export const FOOD_API_URL = `${API_BASE_URL}/foods`;
export const CART_API_URL = `${API_BASE_URL}/cart`;
export const ORDER_API_URL = `${API_BASE_URL}/orders`;
export const PAYMENT_API_URL = `${API_BASE_URL}/payments`;
