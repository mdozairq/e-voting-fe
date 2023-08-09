import CandidateInfoCard from '@/components/CandidateInfoCard'
import CandidateSelection from '@/components/CandidateSelection'
import ProtectedRoute from '@/lib/protectedRoute'
import { Roles } from '@/lib/types'
import React from 'react'


const Candidate = () => {

  return (
    <ProtectedRoute role={Roles.CANDIDATE}>
      <div className='hero h-screen'>
        <div className="flex-1 pt-24 px-2 md:px-8">
          <div className="flex justify-start items h-full bg-gray-200 flex-col overflow-y-scroll">
            <CandidateInfoCard />
            <CandidateSelection/>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}

export default Candidate