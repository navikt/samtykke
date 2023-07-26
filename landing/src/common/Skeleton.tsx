import React, { ReactElement } from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'

export default function Skeleton(): ReactElement {
    return (
        <div className='min-h-screen flex flex-col'>
            <Header />
            <Outlet />
        </div>
    )
}