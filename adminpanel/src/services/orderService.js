import axios from "axios";
import { ORDER_API_URL } from "../config/api";

const API_URL = ORDER_API_URL;

export const fetchAllOrders = async () => {
    try {
        const response = await axios.get(API_URL+"/all");
        return response.data;
    } catch (error) {
        console.error('Error occured while fetching the orders', error);
        throw error;
    }
}

export const updateOrderStatus = async (orderId, status) => {
    try {
        const response = await axios.patch(
            `${API_URL}/status/${orderId}?status=${status}`
        );
        return response.status === 200;
    } catch (error) {
        console.error('Error occured while updating the status', error);
        throw error;
    }
}