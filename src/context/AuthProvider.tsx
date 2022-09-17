import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
  UserCredential
} from "@firebase/auth";

import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase";

type AuthProviderType = { children: React.ReactNode };

type AuthContextType = {
  activeUser: User | null;
  register: (email: string, password: string) => Promise<UserCredential>;
  login: (email: string, password: string) => Promise<UserCredential>;
  logOut: () => Promise<void>;
};

const AuthContext = createContext({} as AuthContextType);

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }: AuthProviderType) => {
  const [activeUser, setActiveUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const register = (email: string, password: string): Promise<UserCredential> =>
    createUserWithEmailAndPassword(auth, email, password);

  const login = (email: string, password: string): Promise<UserCredential> =>
    signInWithEmailAndPassword(auth, email, password);

  const logOut = (): Promise<void> => signOut(auth);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setActiveUser(user);
        setLoading(false);
      } else {
        setActiveUser(null);
        setLoading(false);
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ activeUser, register, login, logOut }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
