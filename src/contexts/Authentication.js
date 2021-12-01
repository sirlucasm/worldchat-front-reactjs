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

  return (
    <AuthenticationContext.Provider value={{
      authenticated,
      setAuthenticated,
      currentUser,
      setCurrentUser,
      isLoading,
      setIsLoading
    }}>
      {children}
    </AuthenticationContext.Provider>
  );
}

export function useAuthentication() {
  const {
    authenticated,
    setAuthenticated,
    currentUser,
    setCurrentUser,
    isLoading,
    setIsLoading
  } = useContext(AuthenticationContext);
  return {
    authenticated,
    setAuthenticated,
    currentUser,
    setCurrentUser,
    isLoading,
    setIsLoading
  };
}
