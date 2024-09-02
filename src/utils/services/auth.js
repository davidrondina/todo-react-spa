import apiConfig from '../apiConfig';
import loginConfig from '../loginConfig';
import Cookie from 'js-cookie';

const login = async (data) => {
    try {
        const response = await loginConfig.post('/api/login', data);
        if (response.status === 200) {
            // Set a token cookie to be used in the authenticated requests
            Cookie.set('token', response.data.token, { secure: true, sameSite: 'Lax' });

            return { response };
        }
    } catch (error) {
        console.log(error);
        throw new Error(error);

    }
}

const logout = async (data) => {
    try {
        const response = await apiConfig.post('/logout', data, {
            headers: {
                'Authorization': `Bearer ${Cookie.get('token')}`
            }
        });

        if (response.status === 200) {
            Cookie.remove('token');
            Cookie.remove('XSRF-TOKEN');

            return { response };
        }
    } catch (error) {
        console.log(error);
        throw new Error(error);

    }
}

export { login, logout };