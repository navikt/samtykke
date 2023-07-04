import React, { ReactElement } from 'react'
import { Outlet } from 'react-router-dom'
import Header from './header/Header'

export default function AppOutlet(): ReactElement {
    return (
        <>
            <Header />
            <Outlet />
        </>
    )
}