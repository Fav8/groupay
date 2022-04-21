import React, { useContext, useEffect, useState } from "react";
import { auth } from "../firebase";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState("");

  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password);
  }
  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }
  function logout() {
    return auth.signOut();
  }

  useEffect(() => {
    const unsubscibe = auth.onAuthStateChanged(async (user) => {
      setCurrentUser(user);
      if (user) {
        const authToken = await user.getIdToken();
        setToken(authToken);
      }
    });
    return unsubscibe;
  }, []);

  useEffect(() => {
    if (token != 'loading') setLoading(false);
  }, [token]);
  /* const value = {
        currentUser,
        signup,
        login,
        logout,
        token
    }   */
  return (
    <AuthContext.Provider value={{ currentUser, signup, login, logout, token }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
