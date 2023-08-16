"use client"
import React from 'react'
import Link from 'next/link'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { ElectionPhase, Roles } from '@/lib/types'
import { resetAppState, setAppState } from '@/redux/slices/appStateReducer'
import RouterButton from './RouterButton'
import { getAppData, getElectionData, getVoterData } from '@/redux/selectors/app'
import CustomButton from './CustomButton'
import { resetAuthState } from '@/redux/slices/authReducter'
import { resetElectionState } from '@/redux/slices/electionStateReducer'
import Timer from './Timer'
import { resetVoterState } from '@/redux/slices/voterStateReducer'

const Navbar = () => {
  const dispatch = useAppDispatch()
  const { current_role } = useAppSelector(getAppData);
  const { voter_election } = useAppSelector(getVoterData);
  const { current_election } = useAppSelector(getElectionData);


  const handleClick = () => {
    localStorage.removeItem('evoting-auth')
    localStorage.removeItem('evoting-role')
    // dispatch({ type: setAppState, payload: { title: "current_role", value: Roles.GUEST } });
    dispatch(resetAppState())
    dispatch(resetAuthState())
    dispatch(resetElectionState())
    dispatch(resetVoterState())
  }

  return (
    <header className='w-full absolute z-10'>
      <nav className='max-w-[1440px] mx-auto flex justify-between items-center
      sm:px-16 px-6 py-4'>
        <Link href='/' className='flex justify-center items-center no-underline'><h2 className='text-black-500 font-bold text-lg'>E-Voting System</h2></Link>
        <div className='flex flex-row align-middle justify-center'>
          <div className='sm:px-16 px-6 py-4'>
            {current_role === Roles.VOTER && voter_election && voter_election.election ? 
            <Timer endTime={voter_election && voter_election.election.end_date} /> :
            current_role === Roles.CANDIDATE && current_election && current_election.election_phase === ElectionPhase.REGISTRATION ?
             <Timer endTime={current_election && current_election.end_date} /> :
             current_role === Roles.ADMIN && current_election && <Timer endTime={current_election && current_election.end_date} />
          }
          </div>
          <div>
            {current_role !== Roles.GUEST &&
              <CustomButton
                title="Logout"
                containerStyle="bg-red-500 text-white p-1 mt-4 rounded cursor-pointer"
                handleClick={handleClick}
              />
            }
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Navbar