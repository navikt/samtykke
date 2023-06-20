import React, { ReactElement } from 'react'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import Header from './header/Header'

export default function Skeleton(): ReactElement {
    return (
        <>
            <Header />
            <Outlet />
            {/* <Footer /> */}
        </>
    )
}