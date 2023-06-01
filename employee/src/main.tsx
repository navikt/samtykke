import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, createRoutesFromElements, HashRouter, Outlet, Route, RouterProvider, Routes } from 'react-router-dom'
import './index.css'
import '@navikt/ds-css'
import Landing from './landing/Landing'
import { worker } from './mocks/browser'
import CreateConsent from './createConsent/CreateConsent'
import ActiveConsent from './activeConsent/ActiveConsent'
import Messages from './messages/Messages'
import config from './config'
import Skeleton from './common/Skeleton'

if (config.shouldMockAPI === 'ja') {
    worker.start({
        serviceWorker: {
            url: '/ansatt/mockServiceWorker.js'
        }
    })
}

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
                path: '/samtykke/ny',
                element: <CreateConsent />
            },
            {
                path: '/samtykke/:code',
                element: <ActiveConsent />
            },
            {
                path: '/meldinger',
                element: <Messages />
            }
        ],
    }
], {
    basename: '/ansatt/'
})



ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>
)
