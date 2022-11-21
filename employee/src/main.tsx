import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import Header from './common/Header'
import './index.css'
import '@navikt/ds-css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <HashRouter>
            <Header />
        </HashRouter>
    </React.StrictMode>
)
