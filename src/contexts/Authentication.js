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

  const props = {
    authenticated,
    setAuthenticated,
    currentUser,
    setCurrentUser,
    isLoading,
    setIsLoading
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
