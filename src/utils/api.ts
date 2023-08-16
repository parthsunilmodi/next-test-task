import axios from 'axios';

const NEXT_PUBLIC_BACKEND_URL: string | undefined = process.env.NEXT_PUBLIC_BACKEND_URL || '';

const axiosInstance = axios.create({
  baseURL: NEXT_PUBLIC_BACKEND_URL
});

export default axiosInstance;
