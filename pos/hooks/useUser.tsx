import { createContext, useContext, useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

interface UserContextType {
  user: any;
  token: string | null;
  updateUser: (user: any) => void;
  updateToken: (token: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: session } = useSession();
  const [user, setUser] = useState(session?.user || null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    if (session?.user) {
      setUser(session.user);
    }
  }, [session]);

  const updateUser = (user: any) => {
    setUser(user);
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
