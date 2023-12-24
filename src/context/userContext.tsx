import axios from "axios";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { BACKEND_URL } from "../../config";
import { useLocation } from "react-router-dom";

const AuthContextUser = createContext<AuthContextTypeUser>(
  {} as AuthContextTypeUser
);

export const AuthContextProviderUser = ({ children }: { children: any }) => {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [fetched, setFetched] = useState<boolean>(false);
  const getLoggedIn = async () => {
    try {
      setLoading(true);
      const loggedInResponse = await axios.get(
        `${BACKEND_URL}/user/getDetails`,
        {
          withCredentials: true,
        }
      );
      setLoading(false);
      setError(false);
      if (loggedInResponse.status === 200) {
        setLoggedIn(true);
        setUser(loggedInResponse.data.data);
      } else {
        setLoggedIn(false);
        setUser(undefined);
      }
      setFetched(true);
    } catch (e) {
      setLoggedIn(false);
      setLoading(false);
      setUser(undefined);
      setError(true);
      setFetched(true);
    }
  };

  const location = useLocation();

  // If we change page, reset the error state.
  useEffect(() => {
    if (location.pathname.includes("/user/")) {
      if (error) setError(false);
      setFetched(false);
    }
  }, [location.pathname]);

  useEffect(() => {
    if (location.pathname.includes("/user/")) {
      getLoggedIn();
    }
  }, []);

  const cachedValue = useMemo(
    () => ({
      user: user,
      isLoggedIn: loggedIn,
      isLoading: loading,
      error: error,
      isFetched: fetched,
    }),
    [user, loggedIn, loading, error]
  );
  return (
    <AuthContextUser.Provider value={cachedValue}>
      {!loading && children}
    </AuthContextUser.Provider>
  );
};

export default function useAuthUser() {
  return useContext(AuthContextUser);
}
