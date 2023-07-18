"use client"
import { useRouter } from "next/navigation";
import { authenticateAdmin, authenticateVoter, authenticateCandidate, authenticateGuest } from "@/lib/auth";
import { Roles } from "./types";
import { useAppSelector } from "@/redux/hooks";
import { getAppData } from "@/redux/selectors/app";

type ProtectedRouteProps = {
  role: Roles;
  children: React.ReactNode;
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ role, children }) => {
  const router = useRouter();
  const { current_role } = useAppSelector(getAppData);
  console.log(current_role, role);


  const isAuthenticated = () => {
    switch (role) {
      case Roles.ADMIN:
        return authenticateAdmin(current_role);
      case Roles.VOTER:
        return authenticateVoter(current_role);
      case Roles.CANDIDATE:
        return authenticateCandidate(current_role);
      case Roles.GUEST:
        return authenticateGuest(current_role);
      default:
        return false;
    }
  };

  if (!isAuthenticated()) {
    switch (current_role) {
      case Roles.ADMIN:
        router.replace("/admin");
        break;
      case Roles.VOTER:
        router.replace("/voter");
        break;
      case Roles.CANDIDATE:
        router.replace("/candidate");
        break;
      case Roles.GUEST:
        router.replace("/");
        break;
      default:
        router.replace('/')
    }
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;