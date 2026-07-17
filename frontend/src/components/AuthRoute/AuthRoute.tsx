import { ROUTES } from "@/constants/routes";
import { useStore } from "@/store/store"
import { Navigate, Outlet } from "react-router-dom";


export const AuthRoute = () => {
  const token = useStore(state => state.token);

  return token ? <Outlet /> : <Navigate to={ROUTES.LOGIN} replace />
}