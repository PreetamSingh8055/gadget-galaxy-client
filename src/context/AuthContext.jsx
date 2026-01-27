import { getProfile, loginapi, logoutapi } from "@/API/Interceptor";

import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

//  create context
const authContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const getUserProfile = async () => {
    try {
      const response = await getProfile();
      if (response) {
        setUser(response.data.data);
      }
    } catch (err) {
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserProfile();
  }, []);

  const login = async (formdata) => {
    const response = await loginapi(formdata);
    if (response?.status === 200) {
      setUser(response.data.data.name);
    }
    return response;
  };
  const logout = async () => {
    await logoutapi();
    setUser(null);
  };
  const data = {
    user,
    loading,
    setUser,
    login,
    logout,
    isAuthenication: !!user,
  };

  return <authContext.Provider value={data}>{children}</authContext.Provider>;
};

export const useUser = () => useContext(authContext);
