import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter, Route, Routes } from 'react-router-dom'
import Header from './common/Header'
import './index.css'
import '@navikt/ds-css'
import Landing from './landing/Landing'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <HashRouter>
            <Header />
            <Routes>
                <Route path='/' element={<Landing />} />
            </Routes>
        </HashRouter>
    </React.StrictMode>,
)
