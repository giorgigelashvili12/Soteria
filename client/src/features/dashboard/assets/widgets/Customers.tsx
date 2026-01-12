import { User2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Customers() {
  return (
    <Link to="">
      <Button className="bg-white text-stone-600 hover:bg-stone-200 cursor-pointer w-full flex justify-start">
        <User2 className="size-4.5" /> Customers
      </Button>
    </Link>
  );
}
