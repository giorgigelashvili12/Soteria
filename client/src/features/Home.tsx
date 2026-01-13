import { Outlet, useNavigate } from "react-router-dom";
import { Toaster } from "sonner";
import { useEffect } from "react";

export default function Home() {
  const nav = useNavigate();

  useEffect(() => {
    nav("/");
  }, [nav]);

  return (
    <>
      <Toaster position="bottom-left" richColors />
      <Outlet />
    </>
  );
}
