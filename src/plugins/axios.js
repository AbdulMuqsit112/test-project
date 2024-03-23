import axios from "axios";

const axiosInstance = axios.create({
  baseURL: 'http://185.177.59.169:8090/',
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const AxiosPlugin = {
  install(Vue) {
    Vue.prototype.$http = axiosInstance;
  },
};

export default AxiosPlugin;