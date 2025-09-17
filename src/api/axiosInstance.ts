import axios from 'axios'
import Cookies from 'js-cookie'

export const instance = axios.create({
    baseURL: 'https://flower-shop-backend-egb4.onrender.com',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
})

instance.interceptors.request.use(config => {
    const token = Cookies.get('token')
    if (token) {
        config.headers.Authorization = `Token ${token}`
    }
    return config
})