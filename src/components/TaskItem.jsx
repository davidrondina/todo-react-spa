import React, { useEffect, useState } from 'react'
import { Form, Link, useSubmit } from 'react-router-dom'

const TaskItem = ({ task }) => {
    const [checked, setChecked] = useState(task.is_done ? true : false);
    const submit = useSubmit();

    const handleSubmit = (event) => {
        setChecked(!checked);
        submit(event.currentTarget.form);
    }

    return (
        <li key={task.id} className={`flex items-center w-full px-4 py-3 gap-x-6 ${task.is_done ? 'opacity-70' : ''} `}>
            <Form method="post" action={`${task.id}/check`}>
                {/* Gets the current URL path to redirect back to it after performing the action in the next route  */}
                <input type="hidden" name="redirectTo" value={location.pathname} />

                <input type="hidden" name="name" defaultValue={task.name} />
                <input type="hidden" name="description" defaultValue={task.description} />
                <input type="hidden" name="priority" defaultValue={task.priority} />
                <input type="hidden" name="due_at" defaultValue={task.due_at} />

                {/* 
                    The JSON being sent to the back-end automatically converts all values
                    into strings, so I have to assign 1 or 0 (truthy & falsy value) 
                    to this checkbox.

                    Otherwise, the backend would consider the value "1", or
                    "true" & "false" as truthy, because it's a non-empty string. 
                    Therefore, it would store
                */}
                <input type="hidden" name="is_done" value={checked ? 0 : 1} />

                <input
                    onChange={(event) => { handleSubmit(event) }}
                    type="checkbox"
                    className="w-4 border border-gray-300 aspect-square hover:cursor-pointer"
                    defaultChecked={checked}
                />
            </Form>
            <div className="flex items-center justify-between w-full">
                <Link to={`/tasks/${task.id}/edit`}>
                    <span className={`${task.is_done ? 'line-through' : 'hover:underline'}`}>{task.name || 'Untitled Task'}</span>
                    {/* {typeof task.is_done + ' ' + typeof checked} */}
                </Link>
                <span className="text-sm text-neutral-700">{task.due_at}</span>
            </div>
        </li>
    )
}

export default TaskItem