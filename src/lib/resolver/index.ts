import { ReactNode } from 'react';
import { useRouter } from 'next/router';

interface PrivateRouteProps {
  path: string;
  children: ReactNode;
}

const ResolvePage = (path: string) => {
    
  return ({ children }: PrivateRouteProps) => {
    const router = useRouter();

    if (router.pathname !== path) {
      return null;
    }

    // return <>{children}</>;
  };
};

export default ResolvePage;
