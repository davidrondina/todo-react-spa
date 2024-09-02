import React, { useState, useContext } from 'react'
import { Form, Navigate, replace, useNavigate, useNavigation, useSubmit } from 'react-router-dom';

import { UserContext } from '../../utils/context';
import { login } from '../../utils/services/auth';
import { useForm } from 'react-hook-form';

export const action = async ({ request }) => {
    // Get the request body and resolve to FormData()
    // const formData = await request.formData();

    // Collect all in the input fields into an object
    // const userCredentials = Object.fromEntries(formData);

    // await axios.get('http://localhost:8000/sanctum/csrf-cookie', { withCredentials: true });

    const userCredentials = await request.json();

    const { response } = await login(userCredentials);

    if (response.status === 200) {
        return replace('/tasks');
    }
}

const Login = () => {
    let isLoggedIn = useContext(UserContext);
    const navigation = useNavigation();
    const submit = useSubmit();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const isLoading = navigation.state === 'loading';
    const isSubmitting = navigation.state === 'submitting';

    /**
     * 
     * Using React Router for action and React Hook Form for validation.
     * 
     * Learned this approach here:
     * https://github.com/orgs/react-hook-form/discussions/9910#discussioncomment-9250882
     * 
     */
    const submitForm = (data) => {
        submit(data, {
            method: 'post',
            encType: 'application/json',
        });
    }

    return (
        <div className={`${(isLoading || isSubmitting) ? 'opacity-60' : ''} flex items-center justify-center w-full h-screen bg-neutral-200`}>
            <div className="px-4 py-3 space-y-4 bg-white rounded-md w-96">
                <h1 className="text-3xl font-black">Login</h1>
                <form onSubmit={handleSubmit(submitForm)} className="flex flex-col gap-y-2">
                    <label className="flex flex-col gap-y-1">
                        <span className="text-sm font-semibold text-gray-700">Email</span>
                        <input {...register('email', { required: true })} type="email" name="email" placeholder="Provide your email address" className="px-2 py-1.5 border border-gray-300 rounded-lg" />
                        {errors.email && <span className="text-sm text-red-700">Email is required</span>}
                    </label>
                    <label className="flex flex-col gap-y-1">
                        <span className="text-sm font-semibold text-gray-700">Password</span>
                        <input {...register('password', { required: true })} type="password" name="password" placeholder="Provide your account password" className="px-2 py-1.5 border border-gray-300 rounded-lg" />
                        {errors.password && <span className="text-sm text-red-700">Password is required</span>}
                    </label>
                    <div className="text-right">
                        <button type="submit" className="bg-blue-800 text-white font-semibold px-5 py-2.5 rounded-lg">Enter</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login