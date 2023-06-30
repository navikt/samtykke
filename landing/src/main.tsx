import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider, } from 'react-router-dom'
import './index.css'
import '@navikt/ds-css'
import Landing from './landing/Landing'
import SignIn from './signIn/SignIn'
import Skeleton from './common/Skeleton'

const router = createBrowserRouter([
    {
        path: '/',
        element: <Skeleton />,
        children: [
            {
                path: '/',
                element: <Landing />
            },
            {
                path: '/innlogging',
                element: <SignIn />
            }
        ]
    }
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <div className="min-h-screen flex flex-col">
            <RouterProvider router={router}/>
        </div>
    </React.StrictMode>,
)