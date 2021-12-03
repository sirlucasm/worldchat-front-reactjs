import Cookies from 'js-cookie';
import router from 'next/router';
import { createContext, useContext, useEffect, useState } from 'react';

const AuthenticationContext = createContext();

export default function AuthenticationProvider({ children }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!authenticated) {
      router.replace('/');
    }
  }, [authenticated]);

  const signOut = () => {
    Cookies.remove('user');
    router.replace('/');
  }

  const props = {
    authenticated,
    setAuthenticated,
    currentUser,
    setCurrentUser,
    isLoading,
    setIsLoading,
    signOut
  };

  return (
    <AuthenticationContext.Provider value={props}>
      {children}
    </AuthenticationContext.Provider>
  );
}

export function useAuthentication() {
  return useContext(AuthenticationContext);
}
