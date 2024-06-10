import React from "react";
import { useSelector } from "react-redux";
import AuthLayout from "src/layouts/auth";
import SendOTPForm from "src/sections/auth/forgetPassword/SendOTPForm";
import VerifyOTPForm from "src/sections/auth/forgetPassword/VerifyOTPForm";
import ResetPasswordForm from "src/sections/auth/forgetPassword/ResetPasswordForm";

const ForgotPassword = () => {
  const activeStep = useSelector((state) => state.user.activeStep);

  const heading =
    activeStep === 0
      ? "Send OTP to Email"
      : activeStep === 1
      ? "Verify OTP code"
      : "Reset your Password";

  const form =
    activeStep === 0 ? (
      <SendOTPForm />
    ) : activeStep === 1 ? (
      <VerifyOTPForm />
    ) : (
      <ResetPasswordForm />
    );

  return (
    <>
      <AuthLayout title="Reset Password" heading={heading} form={form} reset goBack />
    </>
  );
};

export default ForgotPassword;
