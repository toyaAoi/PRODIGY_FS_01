import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000',
    withCredentials: true, // Include cookies with requests
});

axiosInstance.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const res = await axiosInstance.get('/refresh');
                if (res.status === 200) {
                    axiosInstance.defaults.headers.common['Authorization'] = 'Bearer ' + res.data.accessToken;
                    return axiosInstance(originalRequest);
                }
            } catch (error) {
                return Promise.reject(error);
            }
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
