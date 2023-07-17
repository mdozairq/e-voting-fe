import React from "react";
import { useAppSelector } from "@/redux/hooks";
import { getAppData } from "@/redux/selectors/app";
import { useRouter } from "next/navigation";
import { Roles } from "./types";

function ProtectedRoute<T>(Component: React.ComponentType<T>) {
  const { current_role } = useAppSelector(getAppData);
  const router = useRouter();

  const WrappedComponent: React.ComponentType<any> = (props: any) => {
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
      default:
        break;
    }

    return <Component {...props} />;
  };

  WrappedComponent.displayName = `ProtectedRoute(${Component.displayName || Component.name || "Component"})`;

  return WrappedComponent;
}

export default ProtectedRoute;
