import PhaseSwitcher from '@/components/PhaseSwitcher'
import ProtectedRoute from '@/lib/protectedRoute'
import { Roles } from '@/lib/types'
import React from 'react'

const Admin = () => {

    return (
        <ProtectedRoute role={Roles.ADMIN}>
            <div className='h-[90vh]'>
                <div className="flex-1 pt-24 padding-x h-[80vh]">
                    <PhaseSwitcher />
                </div>
            </div>
        </ProtectedRoute>
    )
}

export default Admin