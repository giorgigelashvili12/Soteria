import { useState } from "react";
import {
  Users,
  BarChart2,
  PieChart,
  Activity,
  ShieldAlert,
} from "lucide-react";
import Analytics from "./assets/Analytics";
import WorkspaceTable from "./assets/Table";
import MyWorkspaces from "./pages/MyWorkspaces";
import { WorkspaceProvider } from "./context/WorkspaceContext";

const WorkspaceDashboard = ({ workspaceId }: { workspaceId: string }) => {
  const [activeTab, setActiveTab] = useState("members");

  const tabs = [
    { id: "members", label: "Members", icon: <Users size={18} /> },
    { id: "workspaces", label: "My Workspaces", icon: <BarChart2 size={18} /> },
    { id: "roles", label: "Role Distribution", icon: <PieChart size={18} /> },
    { id: "activity", label: "Activity Log", icon: <Activity size={18} /> },
    { id: "security", label: "Security", icon: <ShieldAlert size={18} /> },
  ];

  return (
    <WorkspaceProvider id={workspaceId}>
      <div className="w-full max-w-6xl mx-auto p-4">
        <div className="flex border-b border-gray-200 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 text-sm font-medium transition-colors border-b-2  ${
                activeTab === tab.id
                  ? "border-emerald-600 text-emerald-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-lg p-4">
          {activeTab === "members" && (
            <div>
              <h3 className="text-lg font-semibold mb-4 border-b border-stone-300 pb-5">
                Active Members & Pending Invites
              </h3>
              <div>
                <WorkspaceTable />
              </div>
            </div>
          )}

          {activeTab === "workspaces" && (
            <div className="animate-in fade-in duration-500">
              <MyWorkspaces />
            </div>
          )}

          {activeTab === "roles" && (
            <div className="p-8 text-center border-2 border-dashed rounded-lg">
              <p className="text-gray-500">
                Visualization of Admin vs Developer roles.
              </p>
            </div>
          )}

          {activeTab === "activity" && (
            <div className="p-8 text-center border-2 border-dashed rounded-lg">
              <Analytics workspaceId={workspaceId} />
            </div>
          )}
        </div>
      </div>
    </WorkspaceProvider>
  );
};

export default WorkspaceDashboard;
