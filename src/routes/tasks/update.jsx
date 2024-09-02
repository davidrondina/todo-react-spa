import { replace } from 'react-router-dom';
import { update as updateTask } from '../../utils/services/tasks';

export const action = async ({ request, params }) => {
    // Get the request body and resolve to FormData()
    const formData = await request.formData();

    // Collect all in the input fields into an object
    const updates = Object.fromEntries(formData);

    // console.log('action', updates);

    await updateTask(params.id, updates);

    return replace(updates.redirectTo);
}