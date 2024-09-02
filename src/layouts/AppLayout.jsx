import React, { useContext, useEffect, useState } from 'react'
import { Form, Outlet, Navigate, redirect, replace, useSubmit, useLoaderData } from 'react-router-dom'

import axios from 'axios';
import apiConfig from '../utils/apiConfig';
import { logout } from '../utils/services/auth'
import { UserContext } from '../utils/context';
import Cookie from 'js-cookie';

export const action = async () => {
    console.log('Logging out');

    const { response } = await logout({ token: Cookie.get('token') });

    if (response.status === 200) {
        return replace('/');
    }
}

export const loader = async () => {
    try {
        const response = await apiConfig.get('/user', {
            headers: {
                'Authorization': `Bearer ${Cookie.get('token')}`
            }
        });
        const user = response.data

        return { user };
    } catch (error) {
        console.log(error);
        return redirect('/');
    }
}

const AppLayout = () => {
    let isLoggedIn = useContext(UserContext);
    const submit = useSubmit();
    const { user } = useLoaderData();

    const token = Cookie.get('token');

    useEffect(() => {
        if (token !== undefined) {
            isLoggedIn = true;
        }
        // console.log(isLoggedIn);
    }, []);

    const logout = () => {
        isLoggedIn = false;

        submit();
    }


    return (
        <>
            <div className="flex min-h-screen px-20 py-12 bg-neutral-200 gap-x-4">
                <div className="w-56 min-h-full">
                    <header className="flex flex-col gap-y-5">
                        <h1 className="text-3xl font-black">To-Dos</h1>
                        <div className="flex items-center gap-x-2">
                            <div className="flex items-center justify-center w-8 bg-gray-300 rounded-full aspect-square">
                                <div className="ri-user-line"></div>
                            </div>
                            <span className="font-bold">Welcome, {user.name}</span>
                        </div>
                        <Form method="post">
                            <button className="w-full flex items-center px-3 py-1.5 font-semibold text-neutral-600 rounded-lg hover:bg-gray-300 hover:text-neutral-800">
                                <i className="mr-2 ri-logout-box-line"></i>
                                Logout
                            </button>
                        </Form>
                    </header>
                </div>
                <main className={`w-3/5 transition ease-in-out duration-150`}>
                    {isLoggedIn ? <Outlet /> : <Navigate to="/" />}
                </main>
            </div>
        </>
    )
}

export default AppLayout