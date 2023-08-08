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
            <div className="flex-1 pt-24 px-2 md:px-8">
                <div className="flex justify-start items h-full bg-gray-200 flex-col overflow-y-scroll">
                    <PhaseProgress/>
                    <ElectionDetail />
                </div>
                </div>
            </div>
        </ProtectedRoute >
    )
}

export default Admin