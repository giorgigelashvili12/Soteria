import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RemoveMember } from "../assets/RemoveMember";

//@ts-expect-error any iyos, interfacebi gaartulebs
export default function MemberDetail({ member, onBack }) {
  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <Button
        variant="ghost"
        onClick={onBack}
        className="gap-2 -ml-2 text-stone-500 cursor-pointer"
      >
        <ArrowLeft className="size-4" /> Back to Team
      </Button>

      <RemoveMember member={member} onRefresh={onBack} />

      <div className="bg-white border border-stone-200 rounded-2xl p-8 shadow-sm">
        <div className="flex items-center gap-6 pb-8 border-b">
          <div className="size-20 rounded-full bg-stone-100 flex items-center justify-center text-2xl font-bold text-stone-600">
            {member.merchant_id?.legalName?.substring(0, 2).toUpperCase()}
          </div>
          <div>
            <h2 className="text-3xl font-bold text-stone-900">
              {member.merchant_id?.legalName}
            </h2>
            <p className="text-stone-500">{member.merchant_id?.email}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          <div>
            <p className="text-xs font-bold text-stone-400 uppercase ">Role</p>
            <p className="mt-1 font-medium capitalize">
              <span className=" text-emerald-700">{member.role}</span>
            </p>
          </div>
          <div>
            <p className="text-xs font-bold text-stone-400 uppercase  ">
              Status
            </p>
            <div className="mt-1 font-medium text-stone-900 capitalize flex items-center gap-2 ">
              {member.status}
            </div>
          </div>
          <div>
            <p className="text-xs font-bold text-stone-400 uppercase  ">
              Joined At
            </p>
            <p className="mt-1 font-medium text-stone-900">
              {member.joined_at
                ? new Date(member.joined_at).toLocaleDateString()
                : "Pending"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
