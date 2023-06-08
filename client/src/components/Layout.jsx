import React from 'react'
import { Navbar } from './Navbar'

export const Layout = ({ children }) => {
    return (
        <React.Fragment>
            <div className=' w-100'>
                <Navbar />
                {children}
            </div>
        </React.Fragment>
    )
}