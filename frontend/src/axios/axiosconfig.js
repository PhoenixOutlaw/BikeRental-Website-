import axios from "axios";
import Cookies from "js-cookie";

const baseURL = "http://localhost:5000/api";
const token  = Cookies.get("token");
const api = axios.create({
    baseURL: baseURL,
    headers:{
        authorization: `Bearer ${token?token:""}`
    }
})
// api.defaults.headers.common['Authorization'] = 'AUTH TOKEN';
// api.defaults.headers.post['Content-Type'] = 'application/json';

export default api;