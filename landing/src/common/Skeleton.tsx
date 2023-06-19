import React, { ReactElement } from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'

export default function Skeleton(): ReactElement {
    return (
        <>
            <Header />
            <Outlet />
        </>
    )
}