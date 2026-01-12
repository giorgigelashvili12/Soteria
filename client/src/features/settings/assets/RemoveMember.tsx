import { useState } from "react";
import axios from "axios";
import { Error } from "@/features/messages/Error";
import type { RemoveMemberProps } from "@/features/@types";

export function RemoveMember({ member, onRefresh }: RemoveMemberProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);

  const remove = async () => {
    setLoading(true);
    try {
      await axios.post(
        `https://soteria-back.vercel.app/api/v1/membership/remove/${member._id}`,
        {
          reason,
        },
        { withCredentials: true },
      );
      console.log(member._id);
      onRefresh();
      setIsOpen(false);
    } catch (e: unknown) {
      console.error("Removal failed", e);
      if (axios.isAxiosError(e)) {
        if (e.response?.status === 404) {
          Error({
            title: "Unable to remove member",
            description: (
              <ul className="list-disc list-inside text-sm">
                <li>Member was not found!</li>
              </ul>
            ),
          });
        } else {
          console.error("error:", e.response?.data?.msg);
        }
      } else {
        console.error("Unexpected error:", e);
      }
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen)
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="text-red-500 hover:text-red-700 text-sm"
      >
        Remove
      </button>
    );

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl p-6 max-w-sm w-full shadow-xl">
        <h3 className="text-lg font-bold">Remove {member.merchant_id.name}?</h3>
        <p className="text-sm text-stone-500 mt-2">
          Please provide a reason. They will be notified by email.
        </p>

        <textarea
          className="w-full border border-stone-200 rounded-lg p-3 mt-4 text-sm focus:ring-2 focus:ring-red-500 outline-none"
          placeholder="e.g. Project ended, violation of terms..."
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />

        <div className="flex gap-3 mt-6">
          <button
            onClick={() => setIsOpen(false)}
            className="flex-1 px-4 py-2 border border-stone-200 rounded-lg"
          >
            Cancel
          </button>
          <button
            disabled={loading || !reason}
            onClick={remove}
            className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg disabled:opacity-50"
          >
            {loading ? "Removing..." : "Confirm Removal"}
          </button>
        </div>
      </div>
    </div>
  );
}
