import axios from "axios";

const axiosInstance = axios.create({
  baseURL: 'http://185.177.59.169:8090/',
});

const AxiosPlugin = {
  install(Vue) {
    Vue.prototype.$http = axiosInstance;
  },
};

export default AxiosPlugin;