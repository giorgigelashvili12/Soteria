import { ArrowDownUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Transactions() {
  return (
    <Link to="/dashboard/transactions">
      <Button className="bg-white text-stone-600 hover:bg-stone-200 cursor-pointer w-full flex justify-start">
        <ArrowDownUp className="size-4.5" />
        Transactions
      </Button>
    </Link>
  );
}
