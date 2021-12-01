import router from 'next/router';
import { createContext, useContext, useEffect, useState } from 'react';

const AuthenticationContext = createContext();

export default function AuthenticationProvider({ children }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState();

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
      setCurrentUser
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
    setCurrentUser
  } = useContext(AuthenticationContext);
  return {
    authenticated,
    setAuthenticated,
    currentUser,
    setCurrentUser
  };
}
