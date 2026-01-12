import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Error } from "@/features/messages/Error";
import type { WorkspaceI } from "@/features/@types";

export default function Workspace() {
  const { id } = useParams();
  const [workspace, setWorkspace] = useState<WorkspaceI | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchW = async () => {
      try {
        const res = await axios.get(
          `https://soteria-q27e.onrender.com/api/v1/workspace/${id}`,
          { withCredentials: true },
        );
        setWorkspace(res.data.workspace);
      } catch (e: unknown) {
        if (axios.isAxiosError(e)) {
          const status = e.response?.status;
          const emsg = e.response?.data?.msg || e.message;

          if (status === 400) {
            Error({
              title: "Bad Request",
              description: (
                <ul className="list-disc list-inside text-sm">
                  <li>Missing ID or Token</li>
                  <li>{emsg}</li>
                </ul>
              ),
            });
          } else if (status === 403) {
            Error({
              title: "Unauthorized",
              description: (
                <ul className="list-disc list-inside text-sm">
                  <li>You don't have access to this workspace</li>
                  <li>{emsg}</li>
                </ul>
              ),
            });
          } else {
            Error({
              title: "Can't Load Workspace",
              description: (
                <ul className="list-disc list-inside text-sm">
                  <li>{emsg}</li>
                </ul>
              ),
            });
          }
        } else {
          console.error("Non-Axios Error:", e);
        }
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchW();
  }, [id]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-stone-50">
        <div className="animate-pulse text-stone-400">Loading Workspace...</div>
      </div>
    );
  }

  if (!workspace) {
    return (
      <div className="flex h-screen items-center justify-center bg-stone-50">
        <div className="text-red-500">
          Workspace not found or access denied.
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen">
      <aside className="w-60 bg-stone-900 text-white p-6">
        <h2 className="font-bold text-xl mb-8">{workspace.name}</h2>
        <nav className="space-y-4">
          <div className="text-stone-400 hover:text-white cursor-pointer">
            Dashboard
          </div>
          <div className="text-stone-400 hover:text-white cursor-pointer">
            Team
          </div>
          <div className="text-stone-400 hover:text-white cursor-pointer">
            Settings
          </div>
        </nav>
      </aside>

      <main className="flex-1 bg-white p-10">
        <header className="border-b pb-4 mb-6">
          <h1 className="text-2xl font-semibold">Workspace Overview</h1>
        </header>
        <p>
          Welcome to the <strong>{workspace.name}</strong> admin panel.
        </p>
      </main>
    </div>
  );
}
