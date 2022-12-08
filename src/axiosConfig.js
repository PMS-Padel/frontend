import axios from 'axios';

const axiosConfig = axios.create({
    baseURL: 'http://localhost:8000/api',
});

let authToken = localStorage.getItem('auth');

axiosConfig.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;

axiosConfig.interceptors.response.use(
    response => {
        return response;
    },
    err => {
        let res = err.response && err.response.data;
        if (res) {
            if (res.message) {
                err.message = res.message;
            } else {
                err.message = `api.errors.${res.error}`;
            }
        }

        return Promise.reject(err);
    },
);

export default axiosConfig;