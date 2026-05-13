import axios from "axios";
import { getAuthToken } from "../service/authService";

// Request Interceptor - Add token to all requests
axios.interceptors.request.use(
    (config) => {
        const token = getAuthToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response Interceptor - Handle token expiration
axios.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            // Token expired or invalid
            localStorage.removeItem("authToken");
            localStorage.removeItem("authUser");
            delete axios.defaults.headers.common["Authorization"];
            window.location.href = "/login";
            console.log("Token expired, redirecting to login");
        }
        return Promise.reject(error);
    }
);

export default axios;
