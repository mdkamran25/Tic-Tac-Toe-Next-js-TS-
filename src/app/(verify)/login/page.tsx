import FormHeader from "@/components/formHeader/formHeader";
import Login from "@/components/login/login";
import { Session, getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

const LoginPage = async () => {
  const session: Session | null = await getServerSession();

  if (session) {
    redirect("/");
  }

  return (
    <div className="min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 rounded-card-radius bg-card-primary py-5 ">
        <FormHeader
          heading="Login to your account"
          paragraph="Don't have an account yet? "
          linkActions={[{ title: "Signup", url: "/signup" }]}
        />
        <Login />
      </div>
    </div>
  );
};

export default LoginPage;
