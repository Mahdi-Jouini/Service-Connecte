import axios from 'axios';


const axiosConfig = axios.create({
  baseURL: 'http://localhost:3000',
});


axiosConfig.interceptors.request.use(
  (config) => {

    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers['Authorization'] = `${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosConfig;
