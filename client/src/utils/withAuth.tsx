import { useEffect, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { UserContext } from '@/context/UserContext';

const withAuth = (WrappedComponent: React.ComponentType) => {
  const AuthComponent = (props: any) => {
    const { user } = useContext(UserContext);
    const router = useRouter();

    useEffect(() => {
      if (!user) {
        router.replace('/signin');
      }
    }, [user, router]);

    return <WrappedComponent {...props} />;
  };

  return AuthComponent;
};

export default withAuth;
