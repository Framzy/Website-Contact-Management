import { Outlet, useNavigate, useLocation } from "react-router";
import { useEffect } from "react";
import { useLocalStorage } from "react-use";

export default function UserCheck() {
  const [token] = useLocalStorage("token", "");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") {
      if (token) {
        navigate("/dashboard/contacts", { replace: true });
      } else {
        navigate("/login", { replace: true });
      }
    }
  }, [token, location.pathname, navigate]);

  return <Outlet />;
}
