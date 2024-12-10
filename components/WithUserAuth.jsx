"use client";
import { useEffect } from "react";
// import { isUserAuthenticated } from "../session";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export const WithUserAuth = (WrappedComponent) => {
  return function WithAuth(props) {
    const { data: session } = useSession();
    useEffect(() => {
      if (!session) {
        redirect("/");
      }
    }, []);

    if (!session) {
      return null;
    }
    return <WrappedComponent {...props} />;
  };
};
