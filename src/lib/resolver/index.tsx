"use client"
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/redux/hooks';
import { getAppData } from '@/redux/selectors/app';
import Admin from '@/app/admin/page';
import { Roles } from '../types';
import { Hero } from '@/components';
import Voter from '@/app/voter/page';
import Candidate from '@/app/candidate/page';

const ResolvePage = () => {
  const { current_role } = useAppSelector(getAppData);
  console.log(current_role);

  // return () => {
    const router = useRouter();

    switch (current_role) {
      case Roles.ADMIN:
        return <Admin/>
        break;
      case Roles.VOTER:
        return <Voter/>
        break;
      case Roles.CANDIDATE:
        return <Candidate/>
        break;
      default:
        return <Hero/>
    }

};

export default ResolvePage;
