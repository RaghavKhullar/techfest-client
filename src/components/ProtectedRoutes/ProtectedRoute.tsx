import { useNavigate } from "react-router-dom";
import useAuthAdmin from "../../context/adminContext";
import useAuthUser from "../../context/userContext";
const ProtectedRoutes = (props: any) => {
  const { type, children } = props;
  const { user, isLoggedIn, error } =
    type === "user" ? useAuthUser() : useAuthAdmin();
  const navigate = useNavigate();

  if (!user || !isLoggedIn) {
    navigate(type === "user" ? "/login" : "/admin/login");
  }

  return children;
};

export default ProtectedRoutes;
