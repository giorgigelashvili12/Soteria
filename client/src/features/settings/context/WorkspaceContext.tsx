import React, { createContext, useContext, useState } from "react";

const WorkspaceContext = createContext<{ workspaceId: string } | undefined>(
  undefined,
);

export const WorkspaceProvider = ({
  id,
  children,
}: {
  id?: string;
  children: React.ReactNode;
}) => {
  const [activeId, setActiveId] = useState(() => {
    return id || localStorage.getItem("active_workspace_id") || "";
  });
  const [prevId, setPrevId] = useState(id);

  if (id !== prevId) {
    setPrevId(id);
    if (id) {
      setActiveId(id);
      localStorage.setItem("active_workspace_id", id);
    }
  }

  return (
    <WorkspaceContext.Provider value={{ workspaceId: activeId }}>
      {children}
    </WorkspaceContext.Provider>
  );
};

// eslint-disable-next-line
export const useWorkspace = () => {
  const context = useContext(WorkspaceContext);
  if (!context)
    throw new Error("useWorkspace must be used within a WorkspaceProvider");
  return context;
};
