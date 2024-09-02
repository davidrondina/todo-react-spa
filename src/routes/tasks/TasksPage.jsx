import React, { useState, useEffect } from 'react'
import { Form, redirect, useLoaderData, useNavigation, useSubmit } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import AddTaskForm from '../../components/AddTaskForm';
import TaskItem from '../../components/TaskItem';
import TaskList from '../../components/TaskList';
import { index, store } from '../../utils/services/tasks';
import api from '../../utils/apiConfig';
import Cookie from 'js-cookie';

export const action = async ({ request }) => {
    // Get the request body and resolve to FormData()
    const formData = await request.formData();

    // Collect all in the input fields into an object
    const data = Object.fromEntries(formData);

    // console.log(data);

    const task = await store(data);

    return { task };
}

export const loader = async () => {
    const tasks = await index();

    return tasks;
}

const TasksPage = () => {
    const { tasks } = useLoaderData();
    const navigation = useNavigation();
    const {
        reset,
        getValues,
        formState,
    } = useForm();
    const submit = useSubmit();
    const isLoading = navigation.state === 'loading';
    const isSubmitting = navigation.state === 'submitting';

    const dueTasks = [];
    const completedTasks = [];

    tasks.forEach((task) => {
        if (task.is_done) {
            completedTasks.push(<TaskItem key={task.id} task={task} />)
        } else {
            dueTasks.push(<TaskItem key={task.id} task={task} />)
        }
    });

    useEffect(() => {
        if (formState.isSubmitSuccessful) {
            reset({
                'name': '',
                'description': '',
                'priority': 'No Priority',
                'due_at': ''
            });
        }
    }, [formState, reset]);

    const submitForm = (data) => {
        const formData = getValues();
        // console.log(formData);

        submit(data, {
            method: 'post',
            encType: 'application/json',
        });
    }

    return (
        <div className={`${(isSubmitting || isLoading) ? 'opacity-60' : ''} space-y-6`}>
            <AddTaskForm submitForm={submitForm} />
            {/* <TaskList tasks={tasks} /> */}
            <div>
                {tasks.length > 0 ? (
                    <div>
                        <div className="space-y-6">
                            <ul className="bg-white rounded-lg">{dueTasks.length > 0 ? dueTasks : ''}</ul>
                            <ul className="bg-white rounded-lg">{completedTasks.length > 0 ? completedTasks : ''}</ul>
                        </div>
                    </div>
                ) : (
                    <p>You have no tasks.</p>
                )}
            </div>
        </div>
    )
}

export default TasksPage;