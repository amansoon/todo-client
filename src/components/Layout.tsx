import React from 'react'
import Navbar from './Navbar'

type Props = {
    children: React.ReactNode
}

function Layout({ children }: Props) {
    return (
        <div>
            <Navbar />
            {children}
        </div>
    )
}

export default Layout