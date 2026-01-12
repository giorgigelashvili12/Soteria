import Sidebar from "./assets/Sidebar";
import Banner from "../shared/Banner";
import Main from "./assets/Main";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { WorkspaceProvider } from "../settings/context/WorkspaceContext";

export default function Dashboard() {
  const nav = useNavigate();
  const [merchant, setMerchant] = useState(null);
  const [membership, setMembership] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const init = async () => {
      try {
        const res = await axios.get(
          "https://soteria-q27e.onrender.com/api/v1/auth/profile",
          {
            withCredentials: true,
          },
        );

        const wsId = res.data.membership?.workspace_id?._id;
        if (wsId) {
          localStorage.setItem("active_workspace_id", wsId);
        }

        const existingId = localStorage.getItem("active_workspace_id");

        if (wsId && !existingId) {
          localStorage.setItem("active_workspace_id", wsId);
        }

        setMerchant(res.data.merchant);
        setMembership(res.data.membership);
        setLoading(false);
      } catch (e: unknown) {
        if (axios.isAxiosError(e)) {
          const status = e.response?.status;

          if (status === 401 || status === 403) {
            console.error("Unauthorized - Redirecting to login");
            nav("/login");
          } else {
            const serverMsg = e.response?.data?.msg || "Server Error";
            console.error(`Error ${status}: ${serverMsg}`);
          }
        } else {
          console.error("Native JS Error:", e);
        }
      }
    };

    init();
  }, [nav]);

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-stone-50">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  return (
    <WorkspaceProvider id={id || ""}>
      <div className="flex flex-col h-screen overflow-hidden bg-stone-100">
        <Banner />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar user={merchant} membership={membership} />
          <Main>
            <Outlet />
          </Main>
        </div>
      </div>
    </WorkspaceProvider>
  );
}
