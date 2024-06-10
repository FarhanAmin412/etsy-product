import AuthLayout from "src/layouts/auth";
import { SignupForm } from "../../../sections/auth/signup";

export default function SignupPage() {
  return (
    <AuthLayout
      title="Sign up"
      heading="Create Your Account to Start the Application:"
      form={<SignupForm button_title="Proceed to Application" signup />}
      goBack
      signup
    />
  );
}
