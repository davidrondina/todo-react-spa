import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { Form } from 'react-router-dom';

import TextInput from './TextInput';

const AddTaskForm = ({ submitForm }) => {
    return (
        <div className="w-full px-4 py-3 bg-white rounded-md">
            <Form method="post" className="flex items-center gap-x-3">
                <div className="flex flex-col grow gap-y-1">
                    <input
                        type="text"
                        name="name"
                        placeholder="What task should be done?"
                        className="w-full text-2xl font-bold border-b border-gray-300 focus:outline-0"
                    />
                </div>

                <div>
                    <button type="submit" className="bg-blue-800 text-white font-semibold px-5 py-2.5 rounded-lg">Add</button>
                </div>
            </Form>

            {/* <Form onSubmit={(event) => { handleValidation(handleSubmit) }} method="post" className="flex flex-col gap-y-2">
            <label className="flex flex-col gap-y-1">
                    <span className="text-sm font-semibold text-gray-700">Name</span>
                    <input {...register('name')} type="text" name="name" placeholder="Untitled Task" className="px-2 py-1.5 border border-gray-300 rounded-lg" />
                    {errors.name && <span className="text-sm font-semibold">errors.name</span>}
                </label>

                <label className="flex flex-col gap-y-1">
                    <span className="text-sm font-semibold text-gray-700">Description</span>
                    <input {...register('description')} type="text" name="description" placeholder="Add a description to your task" className="px-2 py-1.5 border border-gray-300 rounded-lg" />
                </label>

                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-x-7">
                        <div>
                            <select {...register('priority')} className="px-2 py-1.5 border border-gray-300 rounded-lg">
                                {true && priorities.map((priority) => (
                                    <option key={priority} value={priority}>{priority}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="flex items-center gap-x-2">
                                <span {...register('due_at')} className="text-sm font-semibold text-gray-700">Due at</span>
                                <input type="datetime-local" name="due_at" className="px-2 py-1.5 border border-gray-300 rounded-lg" />
                            </label>
                        </div>
                    </div>

                    <div>
                        <button className="bg-blue-800 text-white font-semibold px-5 py-2.5 rounded-lg">Add</button>
                    </div>
                </div>

                <TextInput label="Name" placeholder="Untitled Task" />
                <TextInput label="Description" placeholder="Add description to your task" />
            </Form> */}
        </div >
    )
}

export default AddTaskForm