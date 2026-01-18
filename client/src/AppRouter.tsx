import { createBrowserRouter } from "react-router-dom";
//import VerifyEmail from "./features/auth/assets/VerifyEmail";
import Home from "./features/Home";
// auth
import Login from "./features/auth/Login";
import Signup from "./features/auth/Signup";
import VerifyEmail from "./features/auth/VerifyEmail";
import VerifyPin from "./features/auth/VerifyPin";
import Profile from "./features/auth/Profile";
import Dashboard from "./features/dashboard/Dashboard";
import Settings from "./features/settings/Settings";
import DashHome from "./features/dashboard/assets/pages/Home";
import MemberDetail from "./features/settings/pages/MemberDetail";

import "./assets/styles/global.css";
// import WorkspaceTeam from "./features/settings/WorkspaceTeam";
import WorkspaceWrapper from "./features/settings/Wrapper";
import AcceptInvite from "./features/settings/pages/AcceptInvite";
import Workspace from "./features/settings/pages/Workspace";
import CheckoutPage from "./features/shared/Checkout";
import ProductCatalog from "./features/product-catalog/ProductCatalog";
import API from "./features/docs/API";
import HomePage from "./features/HomePage";
import Balances from "./features/balances/Balances";
import Transactions from "./features/transactions/Transactions";
import Customers from "./features/customers/Customers";

export const AppRouter = createBrowserRouter([
  {
    path: "",
    element: <Home />,
    children: [
      {
        path: "/",
        Component: HomePage,
      },
      {
        path: "/checkout/:clientSecret",
        Component: CheckoutPage,
      },
      {
        path: "/api",
        Component: API,
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/signup",
        Component: Signup,
      },
      {
        path: "/verify-email",
        Component: VerifyEmail,
      },
      {
        path: "/verify-pin",
        Component: VerifyPin,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
        children: [
          {
            index: true,
            Component: DashHome,
          },
          {
            path: "balances",
            Component: Balances,
          },
          {
            path: "transactions",
            Component: Transactions,
          },
          {
            path: "customers",
            Component: Customers,
          },
          {
            path: "product-catalog",
            Component: ProductCatalog,
          },
          {
            path: "settings",
            Component: Settings,
          },
          {
            path: "profile",
            Component: Profile,
          },
          {
            path: "workspace-team/:id",
            Component: WorkspaceWrapper,
            children: [
              {
                path: ":id",
                //@ts-expect-error ar aris prop
                Component: MemberDetail,
              },
            ],
          },
          {
            path: "accept-invite/:token",
            Component: AcceptInvite,
          },
          {
            path: "workspace/:id",
            Component: Workspace,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <p>Not Found</p>,
  },
]);
