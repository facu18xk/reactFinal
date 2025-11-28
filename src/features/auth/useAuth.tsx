import React, { createContext, useContext, useState } from 'react';
import { getEndpoint } from '@/features/sales/api/endpoints'

const AuthContext = createContext<{
  token: string | null;
  login: (
    email: string,
    password: string
  ) => Promise<{ ok: boolean; error?: string }>;
  logout: () => void;
}>({
  token: null,
  login: async () => ({ ok: false, error: "Not implemented" }), logout: () => { },
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [user, setUser] = useState<string | null>(localStorage.getItem('user'));

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch(getEndpoint("/users/users/login/"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        if (response.status === 400 || response.status === 401) {
          return { ok: false, error: "Credenciales incorrectas" };
        }
        return { ok: false, error: "Error en el servidor" };
      }

      const data = await response.json();
      setToken(data.access_token);
      setUser(data.user);
      localStorage.setItem("token", data.access_token);
      localStorage.setItem("user", JSON.stringify(data.user));

      return { ok: true };
    } catch(err) {
      return { ok: false, error: "No se pudo conectar con el servidor" };
    }
  };


  const logout = () => {
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
