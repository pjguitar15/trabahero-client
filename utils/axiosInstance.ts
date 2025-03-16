import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_API, // Set the base URL from environment variables
})

// Optional: Add interceptors if needed
axiosInstance.interceptors.request.use(
  (config) => {
    // You can add headers or modify the request here
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

axiosInstance.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    return Promise.reject(error)
  },
)

export default axiosInstance
