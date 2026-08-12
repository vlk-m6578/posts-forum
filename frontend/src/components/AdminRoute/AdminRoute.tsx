import { ROUTES } from "@/constants/routes";
import { useAuthStore } from "@/store/authStore"
import { Navigate, Outlet } from "react-router-dom";


export const AdminRoute = () => {
  const { user, token } = useAuthStore();

  if (!token) {
    <Navigate to={ROUTES.LOGIN} replace />
  }

  if (user?.role !== 'ADMIN') {
    <Navigate to={ROUTES.FEED} replace />
  }

  return (
    <Outlet />
  )
}