import ElectionDetail from '@/components/ElectionDetail'
import ElectionList from '@/components/ElectionList'
import PhaseProgress from '@/components/PhaseProgress'
import PhaseSwitcher from '@/components/PhaseSwitcher'
import ProtectedRoute from '@/lib/protectedRoute'
import { Roles } from '@/lib/types'
import React from 'react'

const Admin = () => {

    return (
        <ProtectedRoute role={Roles.ADMIN}>
            <div className='hero h-screen'>
                <ElectionDetail/>
            </div>
        </ProtectedRoute>
    )
}

export default Admin