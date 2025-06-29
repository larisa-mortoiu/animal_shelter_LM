import {
  createContext,
  useState,
  ReactNode,
  useEffect,
  useContext,
} from "react";
import { User, AuthContextType } from "./Types";
import axios from "axios";

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (userData: User) => {
    setUser(userData);
    console.log(user);
  };

  const logout = async () => {
    try {
      await axios.post(
        "http://localhost:8090/logout",
        {},
        { withCredentials: true }
      );
      setUser(null);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const check = useEffect(() => {
    const checkAuth = async () => {
      console.log("check");
      try {
        const response = await axios.get("http://localhost:8090/account", {
          withCredentials: true,
        });
        if (response.status === 200) {
          setUser(response.data);
          console.log(response);
        }
      } catch (error) {
        console.log(error);
        setUser(null);
      }
    };

    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, check }}>
      {children}
    </AuthContext.Provider>
  );
};
