import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import '@navikt/ds-css'
import Header from './common/Header'
import { HashRouter, Route, Routes } from 'react-router-dom'
import Landing from './landing/Landing'
import { worker } from './mocks/browser'
import Consent from './consent/Consent'
import ActiveConsents from './activeConsents/ActiveConsents'
import Receipt from './receipt/Receipt'

worker.start({
    serviceWorker: {
        url: '/innbygger/mockServiceWorker.js'
    }
})

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <HashRouter>
            <Header />
            <Routes>
                <Route path='/' element={<Landing />} />
                <Route path='/samtykke/:code' element={<Consent />} />
                <Route path='/samtykker' element={<ActiveConsents />} />
                <Route path='/kvitering' element={<Receipt />} />
            </Routes>
        </HashRouter>
    </React.StrictMode>
)
