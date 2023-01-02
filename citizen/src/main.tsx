import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import '@navikt/ds-css'
import Header from './common/Header'
import { HashRouter, Route, Routes } from 'react-router-dom'
import Landing from './landing/Landing'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <HashRouter>
            <Header />
            <Routes>
                <Route path='/' element={<Landing />} />
            </Routes>
        </HashRouter>
    </React.StrictMode>
)
