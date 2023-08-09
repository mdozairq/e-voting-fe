"use client"
import React from 'react'
import Link from 'next/link'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { Roles } from '@/lib/types'
import { resetAppState, setAppState } from '@/redux/slices/appStateReducer'
import RouterButton from './RouterButton'
import { getAppData } from '@/redux/selectors/app'
import CustomButton from './CustomButton'
import { resetAuthState } from '@/redux/slices/authReducter'
import { resetElectionState } from '@/redux/slices/electionStateReducer'

const Navbar = () => {
  const dispatch = useAppDispatch()
  const { current_role } = useAppSelector(getAppData)

  const handleClick = () => {
    localStorage.removeItem('evoting-auth')
    localStorage.removeItem('evoting-role')
    // dispatch({ type: setAppState, payload: { title: "current_role", value: Roles.GUEST } });
    dispatch(resetAppState())
    dispatch(resetAuthState())
    dispatch(resetElectionState())
  }

  return (
    <header className='w-full absolute z-10'>
      <nav className='max-w-[1440px] mx-auto flex justify-between items-center
      sm:px-16 px-6 py-4'>
        <Link href='/' className='flex justify-center items-center no-underline'><h2 className='text-black-500 font-bold text-lg'>E-Voting System</h2></Link>
        {current_role !== Roles.GUEST &&
          <CustomButton
            title="Logout"
            containerStyle="bg-red-500 text-white p-1 mt-4 rounded cursor-pointer"
            handleClick={handleClick}
          />
        }
      </nav>
    </header>
  )
}

export default Navbar