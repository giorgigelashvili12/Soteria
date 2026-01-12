import { Wallet2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Balances() {
  return (
    <Link to="">
      <Button className="bg-white text-stone-600 hover:bg-stone-200 cursor-pointer w-full flex justify-start">
        <Wallet2 className="size-4.5" /> Balances
      </Button>
    </Link>
  );
}
