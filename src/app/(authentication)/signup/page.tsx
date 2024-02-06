import FormHeader from "@/components/formHeader/formHeader";
import Signup from "@/components/signup/signup";
import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Signup",
};

const SignupPage = () => {
  return (
    <>
      <FormHeader
        heading="Create new account"
        paragraph="Already have an account? "
        linkActions={[{ title: "Login", url: "/login" }]}
      />
      <Signup />
    </>
  );
};

export default SignupPage;
