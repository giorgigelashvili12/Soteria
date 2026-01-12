import { useState } from "react";
import axios from "axios";
import type { Role } from "@/features/@types";
import type { ChangeRoleProps } from "@/features/@types";

export function ChangeRole({
  membershipId,
  currentRole,
  onRefresh,
}: ChangeRoleProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [role, setRole] = useState<Role>(currentRole);
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    setLoading(true);
    try {
      await axios.patch(
        `https://soteria-q27e.onrender.com/api/v1/workspace/membership/${membershipId}/role`,
        { newRole: role },
        { withCredentials: true },
      );
      onRefresh();
      setIsOpen(false);
    } catch (err) {
      console.error("Failed to update role", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="text-stone-600 hover:text-emerald-600 text-sm font-medium px-3 py-1 rounded-md hover:bg-emerald-50 transition-colors"
      >
        Edit Role
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-sm">
            <h3 className="text-lg font-bold text-stone-900">
              Change Member Role
            </h3>
            <p className="text-sm text-stone-500 mb-4">
              Select the new permission level for this user.
            </p>

            <select
              value={role}
              onChange={(e) => setRole(e.target.value as Role)} // useState ze mibmulia Role enum
              className="w-full border border-stone-200 rounded-lg p-2.5 mb-6 outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="viewer">Viewer</option>
              <option value="developer">Developer</option>
              <option value="admin">Admin</option>
            </select>

            <div className="flex gap-3">
              <button
                onClick={() => setIsOpen(false)}
                className="flex-1 py-2 text-stone-600 hover:bg-stone-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                disabled={loading}
                className="flex-1 py-2 bg-stone-900 text-white rounded-lg disabled:opacity-50"
              >
                {loading ? "Saving..." : "Update Role"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
