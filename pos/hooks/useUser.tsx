import { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { removeUserAndToken } from '@/lib/services/sessionService';
import { getProfile } from '@/lib/api/auth';

interface UserContextType {
  user: any;
  token: string | null;
  loading: boolean;
  updateUser: (user: any) => void;
  updateToken: (token: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({
  session,
  children
}: {
  session: any;
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState(session?.user || null);
  const [token, setToken] = useState(session?.token || null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (session?.user) {
      setUser(session.user);
    }
    if (session?.token) {
      setToken(session.token);
    }
  }, [session]);

  useEffect(() => {
    const verifyUserAndToken = async () => {
      if (token && !user) {
        setLoading(true);
        const fetchedUser = await getProfile();
        if (fetchedUser) {
          setUser(fetchedUser);
        } else {
          removeUserAndToken();
          setUser(null);
          setToken(null);
        }
        setLoading(false);
      } else {
        setUser(null);
      }
    };

    verifyUserAndToken();
  }, [token]);

  const updateUser = useCallback((info: any) => {
    setUser((prevUser: any | null) => (prevUser ? { ...prevUser, ...info } : { ...info }));
  }, []);

  const updateToken = useCallback((newToken: string) => {
    setToken(newToken);
  }, []);

  const contextValue = useMemo(() => ({
    user,
    token,
    loading,
    updateUser,
    updateToken
  }), [user, token, loading, updateUser, updateToken]);

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
