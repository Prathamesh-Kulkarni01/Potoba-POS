import { createContext, useContext, useState, useEffect } from 'react';
import { removeUserAndToken } from '@/lib/services/sessionService'; // Import necessary functions
import { getProfile } from '@/lib/api/auth';

interface UserContextType {
  user: any;
  token: string | null;
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
        const fetchedUser = await getProfile();
        if (fetchedUser) {
          setUser(fetchedUser);
        } else {
          removeUserAndToken();
          setUser(null);
          setToken(null);
        }
      } else {
        setUser(null);
      }
    };

    verifyUserAndToken();
  }, [token, user]);

  const updateUser = (info: any) => {
    setUser((user: any | null) => (user ? { ...user, ...info } : { ...info }));
  };

  const updateToken = (token: string) => {
    setToken(token);
  };

  return (
    <UserContext.Provider value={{ user, token, updateUser, updateToken }}>
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
