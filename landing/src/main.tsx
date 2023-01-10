import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter, Route, Routes } from 'react-router-dom'
import Header from './common/Header'
import './index.css'
import '@navikt/ds-css'
import Landing from './landing/Landing'
import SignIn from './signIn/SignIn'
import Footer from './common/Footer'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <HashRouter>
            <Header />
            <Routes>
                <Route path='/' element={<Landing />} />
                <Route path='/innlogging' element={<SignIn />} />
            </Routes>
            <Footer />
        </HashRouter>
    </React.StrictMode>,
)
