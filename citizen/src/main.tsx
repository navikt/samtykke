import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import '@navikt/ds-css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Landing from './landing/Landing'
import { worker } from './mocks/browser'
import Consent from './consent/Consent'
import ActiveConsents from './activeConsents/ActiveConsents'
import Receipt from './receipt/Receipt'
import config from './config'
import Skeleton from './common/Skeleton'
import PrivacyStatement from './privacyStatement/PrivacyStatement'
import ErrorFallback from './common/fallbacks/ErrorFallback'
import RouteNotFoundFallback from './common/fallbacks/RouteNotFoundFallback'

if (config.shouldMockAPI === 'ja') {
    worker.start({
        serviceWorker: {
            url: '/innbygger/mockServiceWorker.js'
        }
    })
}

const router = createBrowserRouter([
    {
        path: '/',
        element: <Skeleton />,
        errorElement: <ErrorFallback />,
        children: [
            {
                path: '/',
                element: <Landing />
            },
            {
                path: '/samtykke/:code',
                element: <Consent />
            },
            {
                path: '/samtykker',
                element: <ActiveConsents />
            },
            {
                path: '/kvitering',
                element: <Receipt />
            },
            {
                path: '/personvernerklæring',
                element: <PrivacyStatement />
            },
            {
                path: '*',
                element: <RouteNotFoundFallback />
            }
        ]
    }
], {
    basename: '/innbygger/'
})

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <div className='min-h-screen flex flex-col bg-gray-100'>
            <RouterProvider router={router}/>
        </div>
    </React.StrictMode>
)
