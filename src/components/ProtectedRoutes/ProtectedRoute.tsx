import { useNavigate } from "react-router-dom";
import useAuthAdmin from "../../context/adminContext";
import useAuthUser from "../../context/userContext";
import { useEffect } from "react";
const ProtectedRoutes = (props: any) => {
  const { type, children } = props;
  const { user, isLoggedIn, error, isFetched } =
    type === "user" ? useAuthUser() : useAuthAdmin();
  const navigate = useNavigate();
  useEffect(() => {
    if ((!user || !isLoggedIn) && isFetched) {
      navigate("/login");
    }
  }, [user, isLoggedIn, type]);

  return isFetched && children;
};

export default ProtectedRoutes;
