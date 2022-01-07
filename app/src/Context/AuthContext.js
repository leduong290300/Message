import React, { useEffect, createContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { auth } from "../Firebase/Config";
import * as ROUTER from "../Routes/index";
import { Spin } from "antd";
export const AuthProvider = createContext();

export default function AuthContext({ children }) {
  const history = useHistory();
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const sub = auth.onAuthStateChanged((user) => {
      if (user) {
        const { displayName, email, uid, photoURL } = user;
        setUser({
          displayName,
          email,
          uid,
          photoURL,
        });
        setIsLoading(false);
        history.push(ROUTER.WINDOWCHAT);
        return;
      }
      setUser({});
      setIsLoading(false);
      history.push(ROUTER.LOGIN);
    });
    //Clean function
    return () => {
      sub();
    };
  }, [history]);
  return (
    <AuthProvider.Provider value={{ user }}>
      {isLoading ? <Spin size="large" /> : children}
    </AuthProvider.Provider>
  );
}
