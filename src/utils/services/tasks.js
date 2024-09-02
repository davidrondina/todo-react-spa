import apiConfig from '../apiConfig';
import Cookie from 'js-cookie';

// Gets all the task resource
const index = async () => {
    try {
        const response = await apiConfig.get('/tasks', {
            headers: {
                'Authorization': `Bearer ${Cookie.get('token')}`
            }
        });
        const tasks = response.data;

        return { tasks };
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
}

// Creates a new resource
const store = async (data) => {
    try {
        const response = await apiConfig.post('/tasks', data, {
            headers: {
                'Authorization': `Bearer ${Cookie.get('token')}`
            }
        })
        const task = response.data.task;

        return { task };
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
}

// Fetches info about a resource
const show = async (id) => {
    try {
        const response = await apiConfig.get(`/tasks/${id}`, {
            headers: {
                'Authorization': `Bearer ${Cookie.get('token')}`
            }
        });
        const task = response.data;

        return { task };
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
}

// Updates a resource
const update = async (id, data) => {
    try {
        const response = await apiConfig.put(`/tasks/${id}`, data, {
            headers: {
                'Authorization': `Bearer ${Cookie.get('token')}`
            }
        });
        const task = response.data.task;

        return { task };
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
}

// Deletes a resource
const destroy = async (id) => {
    try {
        const response = await apiConfig.delete(`/tasks/${id}`, {
            headers: {
                'Authorization': `Bearer ${Cookie.get('token')}`
            }
        });
        const message = response.data;

        return { message };
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
}

export { index, store, show, update, destroy };