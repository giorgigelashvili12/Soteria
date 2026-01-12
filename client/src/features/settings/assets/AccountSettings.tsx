import { Link } from "react-router-dom";
import { File, Store, LockKeyhole } from "lucide-react";
import { useWorkspace } from "../context/WorkspaceContext";

export default function AccountSettings() {
  const { workspaceId } = useWorkspace();

  return (
    <div className="bg-white w-full flex items-center justify-start gap-10">
      <Link
        to=""
        className="group flex gap-4 bg-red-50/20 hover:bg-stone-50 p-6 rounded-2xl border border-transparent z-50 relative"
      >
        <div>
          <Store className="text-lime-500 bg-stone-50 hover:bg-lime-500 hover:text-white transition-colors ease-in-out size-10 p-2 rounded-md" />
        </div>

        <div>
          <h1 className="text-lime-500 font-bold text-[1.1rem]">Business</h1>
          <p className="text-[0.9rem] text-stone-500">
            Account details, health, public info, payouts and more.
          </p>
        </div>
      </Link>

      <Link
        to={workspaceId ? `/dashboard/workspace-team/${workspaceId}` : "#"}
        className={`... ${!workspaceId ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        <div>
          <LockKeyhole className="text-lime-500 bg-stone-50 hover:bg-lime-500 hover:text-white transition-colors ease-in-out size-10 p-2 rounded-md" />
        </div>

        <div>
          <h1 className="text-lime-500 font-bold text-[1.1rem]">
            Workspace Team
          </h1>
          <p className="text-[0.9rem] text-stone-500">
            Invite team members, assign roles, authorize and secure access,
            share resources.
          </p>
        </div>
      </Link>

      <Link to="" className="flex gap-3 hover:bg-stone-50 p-5 rounded-md w-100">
        <div>
          <File className="text-lime-500 bg-stone-50 hover:bg-lime-500 hover:text-white transition-colors ease-in-out size-10 p-2 rounded-md" />
        </div>

        <div>
          <h1 className="text-lime-500 font-bold text-[1.1rem]">Documents</h1>
          <p className="text-[0.9rem] text-stone-500">
            Documents and exports we might need from you.
          </p>
        </div>
      </Link>
    </div>
  );
}
