import Business from "./widgets/Business";
import HomeBtn from "./widgets/HomeBtn";
import Balances from "./widgets/Balances";
import Transactions from "./widgets/Transactions";
import Customers from "./widgets/Customers";
import ProductCatalog from "./widgets/ProductCatalog";
import Payments from "./widgets/Payments";
import Billing from "./widgets/Billing";
import Reports from "./widgets/Reports";
import More from "./widgets/More";
import type { JSX } from "react/jsx-dev-runtime";

//@ts-expect-error aqac interface artulebs zedmetad
export default function Sidebar({ user, membership }): JSX.Element {
  const role = membership?.role || "viewer";

  const access = (allowed: string[], component: JSX.Element) => {
    return allowed.includes(role) ? component : null;
  };

  return (
    <div className="w-60 h-screen flex flex-col justify-start items-start gap-2 p-3 border-r border-stone-200 bg-white overflow-y-auto scrollbar">
      <div className="w-full flex flex-col justify-start items-start gap-2 mb-5">
        <Business user={user} membership={membership} />
      </div>

      <nav className="w-full flex flex-col gap-15">
        <div>
          <HomeBtn />
          {access(["owner", "admin", "analyst"], <Balances />)}
          <Transactions />
          <Customers />
          {access(["owner", "admin", "developer"], <ProductCatalog />)}
        </div>

        <div>
          <p className="ml-2.5 text-sm text-stone-500">Main</p>
          <Payments />
          {access(["owner", "admin"], <Billing />)}
          {access(["owner", "admin", "analyst"], <Reports />)}
          <More />
        </div>
      </nav>
    </div>
  );
}
