import React, { useState, useEffect, useContext, createContext } from "react";
import { fetchPostData } from "../api";
import { baseUrl } from "../config/const";

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

  const storeVotes = (votes) => {
    votes.forEach((vote) => {
      let data = {};
      if (vote.value === true || vote.value === false) {
        data.id = vote.post ? vote.post : vote.comment;
        data.value = vote.value ? "up" : "down";
        localStorage.setItem(data.id, data.value);
      }
    });
  };

  const login = async (username, password) => {
    try {
      const response = await fetchPostData(`${baseUrl}/api/users/login`, {
        username,
        password,
      });
      if (!response.user) {
        return response;
      } else if (response.user) {
        storeVotes(response.votes);
        setUser(response.user);
        setToken(response.token);
        return { user: response.user };
      }
    } catch (err) {
      console.log(err);
    }
  };

  const signup = async (username, password, email) => {
    try {
      const response = await fetchPostData(`${baseUrl}/api/users/create`, {
        username,
        password,
        email,
      });
      return response;
    } catch (err) {
      console.log(err);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.clear();
  };

  const subscribe = (sub) => {
    setUser({ ...user, subscriptions: [...user.subscriptions, sub] });
  };

  const unsubscribe = (sub) => {
    const newSubs = user.subscriptions.filter((s) => s !== sub);
    setUser({ ...user, subscriptions: newSubs });
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
    subscribe,
    unsubscribe,
  };
}
