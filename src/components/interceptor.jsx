import axios from "axios";

// Create an axios instance
const apiInterceptor = axios.create({
  baseURL: "https://your-api-url.com", // replace this with your actual API
});

// Request interceptor (e.g., add token)
apiInterceptor.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
apiInterceptor.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error);
    return Promise.reject(error);
  }
);

export default apiInterceptor;
