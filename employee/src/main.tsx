import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter, Route, Routes } from 'react-router-dom'
import Header from './common/Header'
import './index.css'
import '@navikt/ds-css'
import Landing from './landing/Landing'
import { worker } from './mocks/browser'
import CreateConsent from './createConsent/CreateConsent'
import ActiveConsent from './activeConsent/ActiveConsent'
import Messages from './messages/Messages'
import config from './config'

if (config.shouldMockAPI === 'ja') {
    worker.start({
        serviceWorker: {
            url: '/ansatt/mockServiceWorker.js'
        }
    })
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <HashRouter>
            <Header />
            <Routes>
                <Route path="/" element={<Landing />}/>
                <Route path="/samtykke/ny" element={<CreateConsent />} />
                <Route path="/samtykke/:code" element={<ActiveConsent />} />
                <Route path="/meldinger" element={<Messages />} />
            </Routes>
        </HashRouter>
    </React.StrictMode>
)
