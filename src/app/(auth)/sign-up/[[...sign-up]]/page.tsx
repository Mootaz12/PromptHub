import { SignUp } from "@clerk/nextjs";
import React from "react";

const signUpPage = () => {
  return <SignUp forceRedirectUrl={"/"} />;
};

export default signUpPage;
