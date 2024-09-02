import axios from 'axios';
import Cookie from 'js-cookie';

const apiConfig = axios.create({
    baseURL: 'http://localhost:8000/api',
    withXSRFToken: true,
    withCredentials: true,
    headers: {
        "Authorization": `Bearer ${Cookie.get('token')}`
    }
});


export default apiConfig;