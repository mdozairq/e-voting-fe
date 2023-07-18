import ProtectedRoute from '@/lib/protectedRoute'
import { Roles } from '@/lib/types'
import React from 'react'

const Admin = () => {

    return (
        <ProtectedRoute role={Roles.ADMIN}>
            <div className='hero'>
                <div className="flex-1 pt-24 padding-x">
                    ADMIN
                </div>
            </div>
        </ProtectedRoute>
    )
}

export default Admin