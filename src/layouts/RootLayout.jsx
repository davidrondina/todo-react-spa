import React, { createContext, useState } from 'react'

import { UserContext } from '../utils/context';
import { Outlet } from 'react-router-dom';

const RootLayout = () => {
    return (
        <UserContext.Provider value={{ isloggedIn: false }}>
            <Outlet />
        </UserContext.Provider >
    )
}

export default RootLayout