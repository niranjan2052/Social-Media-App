import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Loading } from "../components";
import { useSelector } from "react-redux";

const PrivateRoutes = ({ children }) => {
  const user = useSelector((state) => state.user.value);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);
  return user ? children : <Loading />;
};

export default PrivateRoutes;
