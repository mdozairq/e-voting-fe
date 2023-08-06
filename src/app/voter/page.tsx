import EVMScreen from '@/components/EvmScreen'
import ProtectedRoute from '@/lib/protectedRoute'
import { Roles } from '@/lib/types'
import React from 'react'

const Voter = () => {
  return (
    <ProtectedRoute role={Roles.VOTER}>
      <div className='hero h-screen'>
        <div className="flex-1 pt-24 padding-x overflow-scroll">
          <EVMScreen />
        </div>
      </div>
    </ProtectedRoute>
  )
}

export default Voter