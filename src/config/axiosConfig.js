import axios from 'axios';
import { Alert, Toast } from '../constants/sweetAlert';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUserDetails } from "../toolkit/userSlice";
import { baseURL } from '../constants/baseURL'

export const AxiosInstance = axios.create({
    baseURL: baseURL,
})

AxiosInstance.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    config.headers["Authorization"] = `${token}`;
    return config;
});

AxiosInstance.interceptors.response.use((response) => {
    return response;
}, ({ response: { data } }) => {
    if (!data.auth) {
        Toast({
            title : "Autherization failed",
            text : "please login again",
            icon : "error"
        }).then(() => {
            localStorage.clear();
        })
    }
})