import { Link } from "react-router-dom";
import {
  Settings,
  Plus,
  LoaderCircle,
  ReceiptText,
  WalletCards,
  Banknote,
  Link2,
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    // Added: sticky, top-0, z-50, and bg-white
    <div className="sticky top-0 z-50 flex justify-center items-center gap-20 w-full px-20 py-3 border-b border-stone-300 bg-white/70 backdrop-blur-md">
      <div className="flex items-center gap-3.5 text-stone-600">
        Switch to sandbox mode to test it
        <Link to="" className="underline text-black font-medium">
          Try it
        </Link>
      </div>

      <div className="flex gap-5 items-center">
        <Link
          to=""
          className="text-stone-600 hover:text-black transition-colors"
        >
          <Settings className="size-5" />
        </Link>

        <Popover>
          <PopoverTrigger asChild>
            <button className="bg-lime-500 hover:bg-lime-600 text-white flex items-center justify-center size-8 rounded-full cursor-pointer transition-colors border-none">
              <Plus className="size-5" />
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-48 p-2" align="end">
            <div className="flex flex-col gap-1">
              <Button
                variant="ghost"
                className="justify-start gap-2 h-10 w-full cursor-pointer"
                asChild
              >
                <Link to="">
                  <ReceiptText className="size-4" /> Invoice
                </Link>
              </Button>
              <Button
                variant="ghost"
                className="justify-start gap-2 h-10 w-full cursor-pointer"
                asChild
              >
                <Link to="">
                  <WalletCards className="size-4" /> Subscription
                </Link>
              </Button>
              <Button
                variant="ghost"
                className="justify-start gap-2 h-10 w-full cursor-pointer"
                asChild
              >
                <Link to="">
                  <Link2 className="size-4" /> Payment Link
                </Link>
              </Button>
              <Button
                variant="ghost"
                className="justify-start gap-2 h-10 w-full cursor-pointer"
                asChild
              >
                <Link to="">
                  <Banknote className="size-4" /> Payment
                </Link>
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      <Link
        to=""
        className="bg-stone-50 flex items-center p-2 px-4 gap-3 hover:bg-stone-100 rounded-md border border-stone-300 transition-all"
      >
        <span className="text-sm font-medium">Complete Setup</span>
        <LoaderCircle className="size-5 text-lime-500 animate-spin" />
      </Link>
    </div>
  );
}
