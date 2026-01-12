import { useState, useEffect } from "react";
import axios from "axios";
import { Plus, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import MemberDetail from "../pages/MemberDetail";
import InviteMember from "./Popup";
import { useWorkspace } from "../context/WorkspaceContext";
import type { Member } from "@/features/@types";
import type { UserMembership } from "@/features/@types";

export default function WorkspaceTable() {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState("");
  const [selected, setSelected] = useState<Member | null>(null);
  const [inviting, setInviting] = useState(false);

  const { workspaceId } = useWorkspace();

  useEffect(() => {
    if (!workspaceId) return;

    const init = async () => {
      try {
        setLoading(true);

        const res = await axios.get(
          `https://soteria-back.vercel.app/api/v1/membership/${workspaceId}/members`,
          { withCredentials: true },
        );
        setMembers(res.data.members ?? res.data ?? []);

        const profileRes = await axios.get(
          "https://soteria-back.vercel.app/api/v1/auth/profile",
          { withCredentials: true },
        );

        const currentM = profileRes.data.memberships?.find(
          (m: UserMembership) => {
            const id =
              typeof m.workspace_id === "object"
                ? m.workspace_id?._id
                : m.workspace_id;
            return id === workspaceId;
          },
        );

        setUserRole(currentM?.role || "viewer");
      } catch (e) {
        console.error("Initialization failed", e);
      } finally {
        setLoading(false);
      }
    };

    init();
  }, [workspaceId]);

  const getRoleStyle = (role: string) => {
    const styles: Record<string, string> = {
      owner: "bg-emerald-50 text-emerald-700 border-emerald-100",
      admin: "bg-blue-50 text-blue-700 border-blue-100",
      developer: "bg-stone-50 text-stone-700 border-stone-100",
    };
    return (
      styles[role?.toLowerCase()] || "bg-gray-50 text-gray-600 border-gray-100"
    );
  };

  if (inviting) {
    return (
      <InviteMember
        workspaceId={workspaceId}
        onBack={() => setInviting(false)}
      />
    );
  }

  return (
    <div className="p-8 space-y-6 max-w-7xl mx-auto">
      {selected ? (
        <MemberDetail member={selected} onBack={() => setSelected(null)} />
      ) : (
        <>
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-stone-900">
                Team Members
              </h1>
              <p className="text-stone-500 text-sm">Manage access and roles.</p>
            </div>

            {["owner", "admin"].includes(userRole) && (
              <Button
                onClick={() => setInviting(true)}
                className="bg-emerald-600 hover:bg-emerald-700 text-white gap-2"
              >
                <Plus className="size-4" /> Invite Member
              </Button>
            )}
          </div>

          <div className="rounded-xl border border-stone-200 bg-white shadow-sm overflow-hidden">
            <Table>
              <TableHeader className="bg-stone-50">
                <TableRow>
                  <TableHead className="w-64">Member</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead className="text-right">Joined</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell
                      colSpan={4}
                      className="h-32 text-center text-stone-400"
                    >
                      <Loader2 className="animate-spin size-4 inline mr-2" />{" "}
                      Loading...
                    </TableCell>
                  </TableRow>
                ) : members.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={4}
                      className="h-32 text-center text-stone-400"
                    >
                      No members found.
                    </TableCell>
                  </TableRow>
                ) : (
                  members.map((member: Member) => (
                    <TableRow
                      key={member._id}
                      onClick={() => setSelected(member)}
                      className="cursor-pointer hover:bg-stone-50/50 transition-colors"
                    >
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-3">
                          <div className="size-8 rounded-full bg-stone-100 flex items-center justify-center text-xs font-bold uppercase">
                            {member.merchant_id?.legalName?.substring(0, 2) ||
                              "??"}
                          </div>
                          {member.merchant_id?.legalName}
                        </div>
                      </TableCell>
                      <TableCell className="text-stone-500">
                        {member.merchant_id?.email}
                      </TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-0.5 rounded border text-[10px] font-bold uppercase ${getRoleStyle(member.role)}`}
                        >
                          {member.role}
                        </span>
                      </TableCell>
                      <TableCell className="text-right text-stone-400 text-xs">
                        {member.joined_at
                          ? new Date(member.joined_at).toLocaleDateString()
                          : "Pending"}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </>
      )}
    </div>
  );
}
