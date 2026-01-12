import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function Banner() {
  return (
    <div className="bg-linear-to-r from-green-500 to-teal-600 text-white flex justify-between items-center p-2 px-20">
      <p className="font-semibold">Test Mode</p>

      <p>
        You're using test data. To process real payments, verify your business.
      </p>

      <p>
        <Link to="" className="flex items-center gap-1.5 hover:underline">
          Complete Your Account <ArrowUpRight className="size-4" />
        </Link>
      </p>
    </div>
  );
}
