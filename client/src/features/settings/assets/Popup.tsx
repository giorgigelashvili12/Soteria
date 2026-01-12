import { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Copy, Check } from "lucide-react";
import { Success } from "@/features/messages/Success";
import { Error } from "@/features/messages/Error";

export default function InviteMember({
  workspaceId,
  onBack,
}: {
  workspaceId: string;
  onBack: () => void;
}) {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("developer");
  const [inviteLink, setInviteLink] = useState("");
  const [copied, setCopied] = useState(false);

  const handleInvite = async () => {
    if (!email || !workspaceId) {
      Error("no email or id");
      return;
    }

    try {
      const res = await axios.post(
        "https://soteria-back.vercel.app/api/v1/membership/invite",
        {
          email: email.trim().toLowerCase(),
          role,
          workspaceId,
        },
        { withCredentials: true },
      );

      const id = res.data.membershipId || res.data._id;
      if (!id) {
        console.error("id is missing");
      }

      setInviteLink(`https://soteria-tan.vercel.app/accept-invite/${id}`);
      Success("Invitation sent");
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e.response?.status === 404) {
          Error({
            title: "Unable To Generate Invitation Link",
            description: (
              <ul className="list-disc list-inside text-sm">
                <li>
                  Person you're sending the invite to doesn't have a Soteria
                  account.
                </li>
                <li>
                  Please, ensure that the person you're inviting has an account.
                </li>
              </ul>
            ),
          });
        } else {
          console.error("error:", e.response?.data?.msg);
        }
      } else {
        console.error("Unexpected error:", e);
      }
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(inviteLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-xl mx-auto space-y-6 py-10 animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out">
      <Button variant="ghost" onClick={onBack} className="gap-2 text-stone-500">
        <ArrowLeft className="size-4" /> Back to Team
      </Button>

      <div className="bg-white border border-stone-200 rounded-2xl p-8 shadow-sm space-y-6">
        <h2 className="text-xl font-bold">Invite New Member</h2>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-stone-700">
              Email Address
            </label>
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="user@example.com"
              className="mt-1"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-stone-700">
              Assign Role
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full mt-1 p-2 border border-stone-200 rounded-md text-sm"
            >
              <option value="developer">Developer</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <Button
            onClick={handleInvite}
            disabled={!email}
            className="w-full bg-stone-900 text-white"
          >
            Generate Invitation Link
          </Button>
        </div>

        {inviteLink && (
          <div className="pt-6 border-t animate-in fade-in slide-in-from-top-2">
            <p className="text-sm font-medium text-emerald-600 mb-2">
              Link ready to share:
            </p>
            <div className="flex gap-2">
              <Input
                value={inviteLink}
                readOnly
                className="bg-stone-50 font-mono text-xs"
              />
              <Button size="icon" variant="outline" onClick={copyToClipboard}>
                {copied ? (
                  <Check className="size-4 text-emerald-600" />
                ) : (
                  <Copy className="size-4" />
                )}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
