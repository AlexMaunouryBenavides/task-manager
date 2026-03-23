import {
  type ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

interface User {
  id: number;
  email: string;
  role: string;
}
interface AuthContextType {
  user: User | null;
  loading: boolean;
  setUser: (user: User | null) => void;
}
const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  setUser: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3310/api/v1/me", {
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Auth failed");
        return res.json();
      })
      .then((data) => setUser(data))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);
  return (
    <AuthContext.Provider value={{ user, loading, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
