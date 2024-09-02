import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css';
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router-dom';

import RootLayout from './layouts/RootLayout';
import AppLayout, { action as logoutAction, loader as userLoader } from './layouts/AppLayout';
import ErrorPage from './routes/ErrorPage';
import Login, { action as loginAction } from './routes/auth/Login';
import TasksPage, { loader as tasksLoader, action as storeAction } from './routes/tasks/TasksPage';
import TaskEditPage, { loader as taskLoader, action as editAction } from './routes/tasks/TaskEditPage';
import { action as updateAction } from './routes/tasks/update';
import { action as deleteAction } from './routes/tasks/delete';

const router = createBrowserRouter(
  createRoutesFromElements([
    <Route path="/" element={<RootLayout />} errorElement={<ErrorPage />}>
      <Route index={true} element={<Login />} action={loginAction} />

      {/* Protected routes */}
      <Route path="/tasks" element={<AppLayout />} loader={userLoader} action={logoutAction}>
        <Route index={true} element={<TasksPage />} loader={tasksLoader} action={storeAction} />
        <Route path="/tasks/:id/check" action={updateAction} />
        <Route path="/tasks/:id/edit" element={<TaskEditPage />} loader={taskLoader} action={editAction} />
        <Route path="/tasks/:id/delete" action={deleteAction} />
      </Route>
    </Route>
  ])
)


createRoot(document.getElementById('root')).render(
  /**
   * Strict mode causes the components to render twice as a means to find bugs. 
   * Therefore, it causes the router to instantiate twice as well
   * 
   * Calling <Navigate to="/some-path" /> to redirect to a sub-route path,
   * seems to cause the loader to get called twice 
   * Source: https://github.com/remix-run/react-router/issues/9967
   */
  // <StrictMode>
  <RouterProvider router={router} />
  // </StrictMode>,
)
