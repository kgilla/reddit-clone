import React, { useState, useEffect, useContext, createContext } from "react";
import { fetchPostData } from "../api";

const authContext = createContext();

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

function useProvideAuth() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  const login = async (username, password) => {
    try {
      const response = await fetchPostData(
        "http://localhost:3000/api/users/login",
        { username, password }
      );
      if (response.user) {
        setUser(response.user);
        setToken(response.token);
        return { user: response.user };
      } else {
        return { user: response.user, message: response.message };
      }
    } catch (err) {
      console.log(err);
    }
  };

  const signup = async (username, password, email) => {
    try {
      const response = await fetchPostData(
        "http://localhost:3000/api/users/create",
        { username, password, email }
      );
      return { user: response.user, message: response.message };
    } catch (err) {
      console.log(err);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
  };

  useEffect(() => {
    const unsubscribe = (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(false);
      }
    };

    return () => unsubscribe();
  }, []);

  return {
    user,
    token,
    login,
    signup,
    logout,
  };
}
