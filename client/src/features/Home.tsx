import { Outlet, Link } from "react-router-dom";
import { Toaster } from "sonner";

export default function Home() {
  return (
    <>
      <Toaster position="bottom-left" richColors />
      <Outlet />
      <Link to="/dashboard">Test</Link>
    </>
  );
}
