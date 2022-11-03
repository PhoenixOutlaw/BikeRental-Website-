import axios from "axios";
const baseURL = process.env.REACT_APP_BASEURL;
const api = axios.create({
    baseURL: baseURL,
})


export default api;