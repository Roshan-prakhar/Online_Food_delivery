import axios from "axios";
import { PAYMENT_API_URL } from "../config/api";

// Create dummy payment order
export const createPaymentOrder = async (amount, token) => {
    try {
        const response = await axios.post(
            PAYMENT_API_URL + "/create-order",
            { amount, currency: "INR" },
            { headers: { Authorization: `Bearer ${token}` } }
        );
        return response.data;
    } catch (error) {
        console.error('Error creating payment order:', error);
        throw error;
    }
};

// Process dummy payment
export const processPayment = async (paymentData, token) => {
    try {
        const response = await axios.post(
            PAYMENT_API_URL + "/process",
            paymentData,
            { headers: { Authorization: `Bearer ${token}` } }
        );
        return response.data;
    } catch (error) {
        console.error('Error processing payment:', error);
        throw error;
    }
};

// Get available payment methods
export const getPaymentMethods = async () => {
    try {
        const response = await axios.get(PAYMENT_API_URL + "/methods");
        return response.data;
    } catch (error) {
        console.error('Error fetching payment methods:', error);
        throw error;
    }
};

// Simulate payment failure (for testing)
export const simulatePaymentFailure = async (orderId, token) => {
    try {
        const response = await axios.post(
            PAYMENT_API_URL + "/simulate-failure",
            { orderId },
            { headers: { Authorization: `Bearer ${token}` } }
        );
        return response.data;
    } catch (error) {
        console.error('Error simulating payment failure:', error);
        throw error;
    }
};
