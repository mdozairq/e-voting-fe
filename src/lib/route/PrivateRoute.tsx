import { useRouter } from 'next/router';
import { useEffect } from 'react';
// import  jwt  from 'jsonwebtoken';

const PrivateRoute = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
  const AuthenticatedComponent: React.FC<P> = (props) => {
    const router = useRouter();

    const isAuthenticated: any = !!localStorage.getItem('admin'); 
    // const decodedToken = jwt.verify(isAuthenticated.token, 'jldsfjaldjfalksfnasff747539745hfhafa'); 
    // console.log(decodedToken);
    
    useEffect(() => {
      if (!isAuthenticated) {
        router.push('/auth/login');
      }
    }, []);

    return isAuthenticated ? <WrappedComponent {...props} /> : null;
  };

  return AuthenticatedComponent;
};

export default PrivateRoute;
