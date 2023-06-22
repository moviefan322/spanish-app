import { createContext, useState, useContext } from "react";

export const CurrentUserContext = createContext({});

interface CurrentUserProviderProps {
  children: React.ReactNode;
}

interface User {
  id: number;
  username: string;
  email: string;
}

interface APIResponse {
  user: User;
}

export const CurrentUserProvider = ({ children }: CurrentUserProviderProps) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const fetchCurrentUser = async () => {
    let response = await fetch("/api/auth/getme");
    const data: APIResponse = await response.json();
    setCurrentUser(data.user);
  };

  return (
    <CurrentUserContext.Provider value={{ currentUser, fetchCurrentUser }}>
      {children}
    </CurrentUserContext.Provider>
  );
};

export const useCurrentUser = () => useContext(CurrentUserContext);
