import { createContext, useState, useContext } from "react";

export const CurrentUserContext = createContext<{
  currentUser: User | null;
  fetchCurrentUser: () => void;
  setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>;
}>({
  currentUser: null,
  fetchCurrentUser: async () => {},
  setCurrentUser: () => {},
});

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
    let response = await fetch("http://localhost:3001/auth/getme");
    const data: APIResponse = await response.json();
    console.log(data);
    setCurrentUser(data.user);
  };

  const value: {
    currentUser: User | null;
    fetchCurrentUser: () => Promise<void>;
    setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>;
  } = {
    currentUser,
    fetchCurrentUser,
    setCurrentUser,
  };

  return (
    <CurrentUserContext.Provider value={value}>
      {children}
    </CurrentUserContext.Provider>
  );
};

export const useCurrentUser = () => useContext(CurrentUserContext);
