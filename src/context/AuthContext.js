import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../firebase';

// List the email(s) that are allowed to access the Admin dashboard.
// Add your own email here. For real production use, a Firestore
// "admins" collection or Firebase custom claims is safer than a
// hardcoded list, but this is a solid, simple starting point.
export const ADMIN_EMAILS = [
  'admin@jinnycoffee.com', // <-- change this to your real admin email
];

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const isAdmin = !!currentUser && ADMIN_EMAILS.includes(currentUser.email);

  const logout = () => signOut(auth);

  const value = { currentUser, isAdmin, loading, logout };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
