import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Settings } from "lucide-react";
import { Box } from "lucide-react";
import { Plus } from "lucide-react";
import { User } from "lucide-react";
import { LogOutIcon } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import type { BusinessProps } from "@/features/@types";

export default function Business({ user, membership }: BusinessProps) {
  const nav = useNavigate();

  const verified = user?.documentVerified || false;

  const legalName =
    membership?.workspace_id?.name || user?.legalName || "New Business";
  const name = legalName.substring(0, 2).toUpperCase();
  const role = membership?.role || "Owner";

  const logout = async () => {
    try {
      await axios.post(
        "https://soteria-q27e.onrender.com/api/v1/auth/logout",
        {},
        { withCredentials: true },
      );
      nav("/login");
    } catch (e) {
      console.error("logout failed", e);
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="p-5 cursor-pointer w-full">
          <div className="bg-stone-100 border border-stone-200 p-1 rounded-md">
            {name}
          </div>
          <span className="truncate">{legalName}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="flex flex-col items-center gap-3">
          <div className="flex justify-center items-center gap-2 flex-col">
            <div className="bg-stone-100 border border-stone-200 p-1 px-2 rounded-md text-black font-bold">
              {name}
            </div>
            <span className="font-semibold text-sm">{legalName}</span>
            <span className="text-xs text-stone-500 capitalize">{role}</span>
          </div>

          <div className="w-full">
            <Button className="bg-white border border-stone-200 text-stone-700 hover:bg-stone-200 cursor-pointer w-full">
              Exit Test Mode
            </Button>
          </div>

          <div className="flex flex-col items-center w-full gap-1.5">
            <Button className="bg-white text-stone-700 hover:bg-stone-200 cursor-pointer w-full flex justify-start">
              <Link
                to="/dashboard/settings"
                className="flex justify-start items-center"
              >
                <Settings className="size-4.5 mr-2" /> Settings
              </Link>
            </Button>

            <Button className="bg-white text-stone-700 hover:bg-stone-200 cursor-pointer w-full flex justify-start">
              <Link to="" className="flex justify-start items-center">
                <Box className="size-4.5 mr-2" /> Switch to Playground
              </Link>
            </Button>

            <Button
              disabled={!verified}
              className={`w-full flex justify-start gap-2 ${!verified ? "opacity-50 grayscale" : "bg-white text-stone-700 hover:bg-stone-100"}`}
              variant="ghost"
            >
              <Plus className="size-4" />
              {verified ? "Create Business" : "Verify Email to Create"}
            </Button>
          </div>
        </div>

        <div className="py-[0.5px] bg-stone-300 mt-2 mb-2"></div>

        <div className="flex flex-col w-full gap-2">
          <Button className="bg-white text-stone-700 hover:bg-stone-200 cursor-pointer w-full border border-stone-200 flex justify-start">
            <Link to="" className="flex justify-start items-center">
              <User className="size-4.5 mr-2" />
              <span className="truncate">
                {user?.legalName || "User Profile"}
              </span>
            </Link>
          </Button>

          <Button
            onClick={logout}
            variant="ghost"
            className="w-full flex justify-start gap-2 text-red-600 hover:bg-red-50 hover:text-red-700"
          >
            <LogOutIcon className="size-4" /> Log Out
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
