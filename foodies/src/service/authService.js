import axios from "axios";
import { AUTH_API_URL } from "../config/api";

const API_URL = AUTH_API_URL;

export const registerUser = async (data) => {
    try {
        const response = await axios.post(
            API_URL+"/register",
            data
          );
        return response
    } catch (error) {
        throw error;
    }
}

export const login = async (data) => {
    try {
        const response = await axios.post(API_URL+"/login", data);
        return response;
    } catch (error) {
        throw error;
    }
}