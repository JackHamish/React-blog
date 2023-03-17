import axios from "axios";

const instance = axios.create({
    baseURL: "https://react-blog-back.onrender.com/api",
});

instance.interceptors.request.use((config) => {
    config.headers.Authorization = JSON.parse(localStorage.getItem("token"));

    return config;
});
export default instance;
