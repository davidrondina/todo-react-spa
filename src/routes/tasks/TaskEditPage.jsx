import React, { useState } from 'react'
import { Form, Link, redirect, replace, useLoaderData, useNavigate, useNavigation, useSubmit } from 'react-router-dom';

import Cookie from 'js-cookie';
import api from '../../utils/apiConfig';
import priorities from '../../utils/constants/priorities'
import { show as showTask, update as updateTask } from '../../utils/services/tasks';

export async function action({ request, params }) {
    // Get the request body and resolve to FormData()
    const formData = await request.formData();

    // Collect all in the input fields into an object
    const updates = Object.fromEntries(formData);

    // Returns a response
    await updateTask(params.id, updates);

    // Redirect after returning a response
    return replace(`/tasks/${params.id}/edit`);
}

export const loader = async ({ params }) => {
    const task = showTask(params.id);

    return task;
}

const TaskEditPage = () => {
    const { task } = useLoaderData();
    const navigate = useNavigate();
    const navigation = useNavigation();
    const submit = useSubmit();
    const [isChecked, setIsChecked] = useState(task.is_done ? true : false);

    return (
        <div className={`${(navigation.state === 'loading') ? 'opacity-60' : ''}`}>
            <div className="flex items-center justify-between">
                {/* navigate(-1) makes the user go back one entry in browser history on click*/}
                <button type="button" onClick={() => { navigate(-1) }} className="flex items-center px-3 py-2 font-semibold gap-x-2">
                    <i className="ri-arrow-left-line"></i>
                    <span>Back</span>
                </button>

                <Form onSubmit={(event) => {
                    if (!confirm('Do you want to delete this task?')) {
                        event.preventDefault();
                    }
                }}
                    action={`/tasks/${task.id}/delete`}
                    method="post"
                >
                    <button
                        type="submit"
                        className="flex items-center px-3 py-2 font-semibold text-red-600 gap-x-2">
                        <i className="ri-delete-bin-line"></i>
                        <span>Delete</span>
                    </button>
                </Form>
            </div >
            <div className="w-full px-4 py-3 bg-white rounded-md">
                <Form method="post" className="flex gap-x-5">
                    <div className="mt-2">
                        <input type="hidden" name="is_done" value={isChecked ? 0 : 1} />
                        <input
                            onChange={(event) => {
                                setIsChecked(!isChecked);
                                submit(event.currentTarget.form);
                            }}
                            type="checkbox"
                            className="w-5 aspect-square hover:cursor-pointer"
                            defaultChecked={isChecked}
                        />
                    </div>

                    <div className="flex flex-col w-full gap-y-3">
                        <input
                            onChange={(event) => { submit(event.currentTarget.form) }}
                            type="text"
                            name="name"
                            placeholder="Untitled Task"
                            className="flex text-2xl font-bold border-b border-gray-300 focus:outline-0"
                            defaultValue={task?.name}
                        />

                        <textarea
                            onChange={(event) => { submit(event.currentTarget.form) }}
                            name="description"
                            rows="6"
                            placeholder="Add a description to your task"
                            className="flex focus:outline-0"
                            defaultValue={task?.description}
                        ></textarea>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-x-7">
                                <div>
                                    <select
                                        onChange={(event) => { submit(event.currentTarget.form) }}
                                        name="priority"
                                        className="px-2 py-1.5 border border-gray-300 rounded-lg"
                                        defaultValue={task.priority}
                                    >
                                        {true && priorities.map((priority) => (
                                            <option key={priority} value={priority}>{priority}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="flex items-center gap-x-2">
                                        <span className="text-sm font-semibold text-gray-700">Due at</span>
                                        <input
                                            onChange={(event) => { submit(event.currentTarget.form) }}
                                            type="datetime-local"
                                            name="due_at"
                                            className="px-2 py-1.5 border border-gray-300 rounded-lg"
                                            defaultValue={task?.due_at}
                                        />
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </Form>
            </div>
        </div>
    )
}

export default TaskEditPage