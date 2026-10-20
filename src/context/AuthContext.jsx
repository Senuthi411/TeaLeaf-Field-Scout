import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { authService } from "../services/authService";
export const AuthContext = createContext(null);
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);
  const [sessionError, setSessionError] = useState("");
  useEffect(() => {
    let current = true;
    authService
      .getSession()
      .then((value) => {
        if (current) setUser(value);
      })
      .catch((error) => {
        if (current) setSessionError(error.message);
      })
      .finally(() => {
        if (current) setInitializing(false);
      });
    return () => {
      current = false;
    };
  }, []);
  const login = useCallback(async (credentials) => {
    const value = await authService.login(credentials);
    setUser(value);
    setSessionError("");
    return value;
  }, []);
  const logout = useCallback(async () => {
    await authService.logout();
    setUser(null);
  }, []);
  const value = useMemo(
    () => ({ user, initializing, sessionError, login, logout }),
    [user, initializing, sessionError, login, logout],
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
