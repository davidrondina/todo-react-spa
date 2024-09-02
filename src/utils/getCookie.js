import Cookies from 'js-cookie';

const getCookie = (name) => {
    if (!Cookies.get(name)) {
        return null;
    }
    return Cookies.get(name);
}

export default getCookie;