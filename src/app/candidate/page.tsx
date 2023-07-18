import ProtectedRoute from '@/lib/protectedRoute'
import { Roles } from '@/lib/types'
import React from 'react'

const Candidate = () => {
  return (
    <ProtectedRoute role={Roles.CANDIDATE}>
      <div className='hero'>
        <div className="flex-1 pt-24 padding-x">
          <h1 className="text-center">Candidate</h1>
        </div>
      </div>
    </ProtectedRoute>
  )
}

export default Candidate