"use client"
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAppDispatch } from '@/redux/hooks';
import { setAppState } from '@/redux/slices/appStateReducer';
import { Roles } from '../types';

const useRouteChangeListener = (): null => {
  const dispatch = useAppDispatch()
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: string): void => {
      if (url === '/voter') {
        dispatch({ type: setAppState, payload: { title: "current_role", value: Roles.VOTER } });
      } else if (url === '/admin') {
        dispatch({ type: setAppState, payload: { title: "current_role", value: Roles.ADMIN } });
      } else if (url === '/candidate') {
        dispatch({ type: setAppState, payload: { title: "current_role", value: Roles.CANDIDATE } });
      } else {
        dispatch({ type: setAppState, payload: { title: "current_role", value: Roles.GUEST } });
      }
    };

    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [dispatch, router]);

  return null;
};

export default useRouteChangeListener;
