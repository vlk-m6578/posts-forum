import { ROUTES } from "../../constants/routes";
import { useAuthStore } from "../../store/authStore"
import { Navigate, Outlet } from "react-router-dom";


export const AuthRoute = () => {
  const { token } = useAuthStore();

  return token ? <Outlet /> : <Navigate to={ROUTES.LOGIN} replace />
}