import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./useAuth";
import { ReactNode } from "react";

interface RequireAuthProps {
  children: ReactNode;
}

export const RequireValidation: React.FC<RequireAuthProps> = ({
  children,
}): JSX.Element => {
  const auth = useAuth();
  const location = useLocation();

  if (!auth.validateToken?.length) {
    return <Navigate to="/login" state={{ path: location.pathname }} />;
  }

  return <>{children}</>;
};