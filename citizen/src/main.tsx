import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import '@navikt/ds-css'
import Header from './common/Header'
import { HashRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <HashRouter>
            <Header />
        </HashRouter>
    </React.StrictMode>
)
