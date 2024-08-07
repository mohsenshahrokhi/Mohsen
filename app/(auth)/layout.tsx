import AuthForm from "@/components/auth/auth-form";
import React from "react";


async function AuthLayout({ children }: { children: React.ReactNode }) {
  return <AuthForm>{children}</AuthForm>;
}

export default AuthLayout;
