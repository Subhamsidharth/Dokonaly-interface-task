import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const useAuth = () => {
  const [token, setToken] = useState(false);
  const [userId, setUserId] = useState(null);


  const login = useCallback((uid, token) => {
    setToken(token);
    setUserId(uid);
    localStorage.setItem(
      "userData",
      JSON.stringify({
        userId: uid,
        token: token,
      })
    );
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    toast.success("Successfully logout");
    localStorage.removeItem("userData");
  }, []);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));

    if (
      storedData &&
      storedData.token 
    ) {
      login(
        storedData.userId,
        storedData.token,
      );
    }
  }, [login]);
  return { login, logout, userId, token };
};