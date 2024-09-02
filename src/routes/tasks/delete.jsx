import { redirect } from 'react-router-dom';
import { destroy as destroyTask } from '../../utils/services/tasks'

export const action = async ({ params }) => {
    await destroyTask(params.id);

    return redirect('/tasks');
}