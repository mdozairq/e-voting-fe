import CandidateInfoCard from '@/components/CandidateInfoCard'
import ElectionList from '@/components/ElectionList'
import ProtectedRoute from '@/lib/protectedRoute'
import { Roles } from '@/lib/types'
import { useAppSelector } from '@/redux/hooks'
import { getAuthData } from '@/redux/selectors/app'
import React from 'react'

const Candidate = () => {


  return (
    <ProtectedRoute role={Roles.CANDIDATE}>
      <div className='hero h-screen'>
        <div className="flex-1 pt-24 px-2 md:px-8">
          <div className="flex justify-start items h-full bg-gray-200 flex-col">
            <CandidateInfoCard />
            <div className='text-center items-center text-2xl text-slate-950 mt-2'>
              Select the Election:
              <br/>
              <hr className='h-0 bg-black m-4'/>
            </div>
            <ElectionList />
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}

export default Candidate