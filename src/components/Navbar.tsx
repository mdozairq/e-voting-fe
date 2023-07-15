import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import CustomButton from './CustomButton'
// import { useAppSelector } from '@/redux/hooks'
// import { getAppData } from '@/redux/selectors/app'

const Navbar = () => {
  // const {role} = useAppSelector(getAppData);
  // console.log(role);
  

  return (
    <header className='w-full absolute z-10'> 
      <nav className='max-w-[1440px] mx-auto flex justify-between items-center
      sm:px-16 px-6 py-4'>
        <Link href='/' className='flex justify-center items-center no-underline'><h2 className='text-black-500 font-bold text-lg'>E-Voting System</h2></Link>
      </nav>
    </header>
  )
}

export default Navbar