import axios from "axios";

const BASE_URL: string = process.env.BACKEND_URL as string;

const apiClient = axios.create({
    baseURL: `${BASE_URL}/api/v1`,
    timeout: 5000,
    headers: {
        "Content-Type": "application/json"
    }
});

export default apiClient;