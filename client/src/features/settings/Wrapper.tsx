import WorkspaceDashboard from "./WorkspaceTeam";
import { useNavigate, useParams, Outlet } from "react-router-dom";
import { useEffect } from "react";

const WorkspaceWrapper = () => {
  const nav = useNavigate();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (!id) {
      nav("/dashboard");
    }
  }, [id, nav]);

  if (!id) return null;

  return (
    <div className="flex h-screen w-full">
      <div className="flex-1 overflow-auto">
        <Outlet context={{ workspaceId: id }} />
        <WorkspaceDashboard workspaceId={id} />
      </div>
    </div>
  );
};

export default WorkspaceWrapper;
