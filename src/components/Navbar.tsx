"use client"
import React from 'react'
import Link from 'next/link'
import { useAppDispatch } from '@/redux/hooks'
import { Roles } from '@/lib/types'
import { setAppState } from '@/redux/slices/appStateReducer'

const Navbar = () => {
  const dispatch = useAppDispatch()

  const handleClick = () => {
    dispatch({ type: setAppState, payload: { title: "current_role", value: Roles.GUEST } });
  }

  return (
    <header className='w-full absolute z-10'>
      <nav className='max-w-[1440px] mx-auto flex justify-between items-center
      sm:px-16 px-6 py-4'>
        <Link href='/' className='flex justify-center items-center no-underline' onClick={handleClick}><h2 className='text-black-500 font-bold text-lg'>E-Voting System</h2></Link>
      </nav>
    </header>
  )
}

export default Navbar