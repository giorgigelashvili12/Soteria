import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Loader2, CheckCircle2, XCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Success } from "@/features/messages/Success";
import { Error } from "@/features/messages/Error";

export default function AcceptInvite() {
  const { token } = useParams();
  const nav = useNavigate();
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading",
  );
  const [workspace, setWorkspace] = useState("");
  const [id, setId] = useState(""); //redirect

  useEffect(() => {
    const invite = async () => {
      try {
        if (!token) {
          console.error("no token");
          Error("missing token");
        }

        const res = await axios.post(
          `https://soteria-back.vercel.app/api/v1/invitation/accept/${token}`,
          {},
          { withCredentials: true },
        );

        if (res.status === 200) {
          setStatus("success");
          setWorkspace(res.data.workspaceName);
          setId(res.data.workspaceId);
          Success(`successfully joined workspace: ${res.data.workspaceName}`);
          setTimeout(() => {
            nav(`workpace/${res.data.workspaceId}`);
          }, 3000);
        }
      } catch (e: unknown) {
        setStatus("error");
        if (axios.isAxiosError(e)) {
          const status = e.response?.status;
          const msg = e.response?.data?.msg || e.message;

          if (status === 400) {
            Error({
              title: "Unable To Join Workspace",
              description: (
                <ul className="list-disc list-inside text-sm">
                  <li>
                    Either your ID or token is missing, or the link is expired.
                  </li>
                  <li>{msg}</li>
                </ul>
              ),
            });
          } else if (status === 404) {
            Error({
              title: "Unable To Join Workspace",
              description: (
                <ul className="list-disc list-inside text-sm">
                  <li>
                    The invite link was not found, or you already are a member.
                  </li>
                  <li>{msg}</li>
                </ul>
              ),
            });
          } else {
            Error({
              title: "Unable To Join Workspace",
              description: (
                <ul className="list-disc list-inside text-sm">
                  <li>{msg}</li>
                </ul>
              ),
            });
          }
        } else {
          console.error("Unexpected error", e);
        }
      }
    };

    invite();
  }, [token, nav]);

  return (
    <div className="h-[70vh] w-full flex items-center justify-center bg-stone-50 p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-stone-200 p-8 text-center">
        {status === "loading" && (
          <div className="space-y-4">
            <Loader2 className="size-12 text-emerald-600 animate-spin mx-auto" />
            <h1 className="text-2xl font-bold text-stone-900">
              Joining Workspace...
            </h1>
            <p className="text-stone-500">Setting up</p>
          </div>
        )}

        {status === "success" && (
          <div className="space-y-4 animate-in zoom-in duration-300">
            <CheckCircle2 className="size-12 text-emerald-600 mx-auto" />
            <h1 className="text-2xl font-bold text-stone-900">
              Welcome to {workspace}!
            </h1>
            <p className="text-stone-500">Invitation acceppted</p>
            <Button
              onClick={() => nav(`/workspace/${id}`)}
              variant="outline"
              className="mt-4"
            >
              Click if not redirected <ArrowRight className="ml-2 size-4" />
            </Button>
          </div>
        )}

        {status === "error" && (
          <div className="space-y-4 animate-in fade-in duration-300">
            <XCircle className="size-12 text-red-500 mx-auto" />
            <h1 className="text-2xl font-bold text-stone-900">
              Invalid Invite
            </h1>
            <div className="pt-4">
              <Button onClick={() => nav("/")} className="w-full bg-stone-900">
                Go to Homepage
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
