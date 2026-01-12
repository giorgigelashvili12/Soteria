import { ArrowDownUp } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Transactions() {
  return (
    <Button className="bg-white text-stone-600 hover:bg-stone-200 cursor-pointer w-full flex justify-start">
      <ArrowDownUp className="size-4.5" />
      Transactions
    </Button>
  );
}
