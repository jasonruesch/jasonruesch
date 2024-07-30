import { createContext, useState } from 'react';

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = () => {};

export const AuthContext = createContext<{
  email: string | null;
  authenticated: boolean;
  login: (email: string, password: string) => void;
  logout: () => void;
}>({ email: null, authenticated: false, login: noop, logout: noop });

export const useAuth = () => {
  const [email, setEmail] = useState<string | null>(null);
  const authenticated = email !== null;

  const login = (email: string, password: string) => {
    // Verify email and password
    if (
      email !== import.meta.env.VITE_AUTH_EMAIL ||
      password !== import.meta.env.VITE_AUTH_PASSWORD
    ) {
      throw new Error('Invalid email or password');
    }

    setEmail(email);
  };

  const logout = () => {
    setEmail(null);
  };

  return { email, authenticated, login, logout };
};
