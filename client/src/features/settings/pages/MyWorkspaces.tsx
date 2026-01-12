import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import type { WorkspaceI } from "@/features/@types";

export default function MyWorkspaces() {
  const [spaces, setSpaces] = useState([]);
  const nav = useNavigate();

  const selection = (wsId: string) => {
    localStorage.setItem("active_workspace_id", wsId);
    nav(`/dashboard/workspace/${wsId}`);
  };

  useEffect(() => {
    const workspaces = async () => {
      const res = await axios.get(
        "https://soteria-back.vercel.app/api/v1/workspace/mine",
        { withCredentials: true },
      );
      console.log(res.data);
      setSpaces(res.data.workspaces);
    };
    workspaces();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-full bg-stone-50">
      <h1 className="text-2xl font-bold mb-6">Select a Workspace</h1>
      <div className="gap-4 w-full flex items-center justify-center">
        {spaces &&
          spaces.map((ws: WorkspaceI) => {
            if (!ws) return null;

            return (
              <button
                key={ws._id}
                onClick={() => selection(ws._id)}
                className="flex items-center gap-2 w-100 p-3 m-2 bg-white border border-stone-300 rounded-md cursor-pointer hover:bg-stone-50 transition-colors ease-in"
              >
                <span className="font-semibold text-stone-800">{ws.name}</span>
                <ArrowRight className="size-4 text-stone-400" />
              </button>
            );
          })}
      </div>
    </div>
  );
}
