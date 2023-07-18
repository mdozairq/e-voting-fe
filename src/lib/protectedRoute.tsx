"use client"
import { useRouter } from "next/navigation";
import { authenticateAdmin, authenticateVoter, authenticateCandidate } from "@/lib/auth";
import { Roles } from "./types";

type ProtectedRouteProps = {
  role: Roles;
  children: React.ReactNode;
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ role, children }) => {
  const router = useRouter();

  const isAuthenticated = () => {
    switch (role) {
      case Roles.ADMIN:
        return authenticateAdmin();
      case Roles.VOTER:
        return authenticateVoter();
      case Roles.CANDIDATE:
        return authenticateCandidate();
      default:
        return false;
    }
  };

  if (!isAuthenticated()) {
    // Redirect to login or unauthorized page
    router.replace("/");
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;