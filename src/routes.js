import { Navigate, useRoutes } from "react-router-dom";
import { useSelector } from "react-redux";
import DashboardLayout from "./layouts/dashboard";
import SimpleLayout from "./layouts/simple";
import Home from "./pages/home";
import SignupPage from "./pages/auth/register/Signup";
import LoginPage from "./pages/auth/login/LoginPage";
import ForgotPassword from "./pages/auth/forgot-password/ForgotPassword";
import DashboardAppPage from "./pages/dashboard/DashboardAppPage";
import UserPage from "./pages/users/UserPage";
import ProductsPage from "./pages/products/ProductsPage";
import ProductPage from "./pages/catalog/detailPages/ProductPage";
import CatalogPage from "./pages/catalog/CatalogPage";
import Orders from "./pages/orders/Orders";
import Cart from "./pages/cart";
import Stores from "./pages/Stores/Stores";
import Profile from "./pages/profile/Profile";
import Settings from "./pages/settings";
import Page404 from "./pages/Page404";
import AboutUs from "./pages/home/AboutUs";
import ContactUs from "./pages/home/ContactUs";
import SignupNotice from "./sections/auth/signup/SignupNotice";
import Mockups from "./pages/mockups/Mockups";
import ChatPage from "./pages/chat";
import Scopes from "./pages/scopes";
import Apps from "./pages/apps";
import ConsentScreen from "./pages/oAuth/ConsentScreen";

export default function Router() {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const userType = useSelector((state) => state.user.user.type);

  const routes = useRoutes([
    {
      path: "/",
      element: <Home />,
      index: true,
    },
    { path: "/about", element: <AboutUs /> },
    { path: "/contact", element: <ContactUs /> },
    {
      path: "/dashboard",
      element: isAuthenticated ? <DashboardLayout /> : <Navigate to="/login" />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: "app", element: <DashboardAppPage /> },
        { path: "user", element: userType === "Super Admin" && <UserPage /> },
        { path: "products", element: <ProductsPage /> },
        { path: "product/:id", element: <ProductPage /> },
        {
          path: "catalog",
          element: <CatalogPage />,
        },
        { path: "stores", element: <Stores /> },
        { path: "settings", element: <Settings /> },
        { path: "profile", element: <Profile /> },
        { path: "orders", element: <Orders /> },
        { path: "checkout", element: <Cart /> },
        { path: "checkout", element: <Cart /> },
        { path: "mockups", element: <Mockups /> },
        { path: "chat", element: <ChatPage /> },
        { path: "scopes", element: <Scopes /> },
        { path: "apps", element: <Apps /> },
      ],
    },

    {
      path: "login",
      element: <LoginPage />,
    },

    {
      path: "signup",
      element: <SignupPage />,
    },
    {
      path: "verification",
      element: <SignupNotice />,
    },

    { path: "reset-password", element: <ForgotPassword /> },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/login" /> },
        { path: "404", element: <Page404 /> },
        { path: "*", element: <Navigate to="/404" /> },
      ],
    },
    {
      path: "*",
      element: <Navigate to="/404" replace />,
    },

    //oAuth Routes
    {
      path: "/app/oauth2/auth",
      element: <ConsentScreen />,
    },
  ]);

  return routes;
}
