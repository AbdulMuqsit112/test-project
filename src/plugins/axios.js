import axios from "axios";

const axiosInstance = axios.create({
  baseURL: 'https://api.example.com/',
});

export default {
  install(VueInstance) {
    VueInstance.prototype.$http = axiosInstance;
  },
};
