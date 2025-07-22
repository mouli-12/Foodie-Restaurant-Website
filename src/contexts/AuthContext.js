import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('authUser');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const login = (email, password, role, userName) => {
    if (email && password && role) {
      const userData = { email, role, userName };
      localStorage.setItem('authUser', JSON.stringify(userData));
      setUser(userData);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('authUser');
    localStorage.removeItem('jwtToken');
  };

  const signup = (email, password, role) => {
    const userData = { email, role };
    localStorage.setItem('authUser', JSON.stringify(userData));
    setUser(userData);
    return true;
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
