import { Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function HomeBtn() {
  return (
    <Link to="/dashboard">
      <Button className="bg-white text-stone-600 hover:bg-stone-200 cursor-pointer w-full flex justify-start">
        <Home className="size-4.5" /> Home
      </Button>
    </Link>
  );
}
