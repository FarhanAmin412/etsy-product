import { LoginForm } from "../../../sections/auth/login";
import AuthLayout from "src/layouts/auth";

const LoginPage = () => {
  return (
    <AuthLayout
      title="Login"
      heading="Login to your account"
      form={<LoginForm />}
      login
    />
  );
};

export default LoginPage;
