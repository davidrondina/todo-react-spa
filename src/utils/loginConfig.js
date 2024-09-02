import axios from 'axios';

/**
 * TODO : Create an axios instance with interceptor that sets the cookie via /sanctum/csrf-cookie
 * before calling the /api/login endpoint
 */

const loginConfig = axios.create({
    baseURL: 'http://localhost:8000',
    withCredentials: true,
    withXSRFToken: true,
})

loginConfig.interceptors.request.use(async (config) => {
    if (config.method.toLowerCase() !== 'get') {
        await loginConfig.get('/sanctum/csrf-cookie');
    }

    return config;
});

export default loginConfig;