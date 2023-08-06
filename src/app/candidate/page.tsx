import ProtectedRoute from '@/lib/protectedRoute'
import { Roles } from '@/lib/types'
import React from 'react'

const Candidate = () => {
  return (
    <ProtectedRoute role={Roles.CANDIDATE}>
      <div className='hero h-screen'>
        <div className="flex-1 pt-24 padding-x">
          <div className="flex justify-center items-center h-full bg-gray-200">
            <div className="bg-white p-8 rounded shadow-md m-8 ">
              <h2>Candidate</h2>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}

export default Candidate