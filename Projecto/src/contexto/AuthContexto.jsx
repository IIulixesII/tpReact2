import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [IsLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem('userData');
    if (saved) {
      const parsed = JSON.parse(saved);
      setUser(parsed);
      setIsLogged(true);
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
    setIsLogged(true);
    localStorage.setItem('userData', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    setIsLogged(false);
    localStorage.removeItem('userData');
  };

  return (
    <AuthContext.Provider value={{ IsLogged, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
