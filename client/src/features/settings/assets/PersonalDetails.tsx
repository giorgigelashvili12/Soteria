import { User2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Mail } from "lucide-react";

export default function PersonalDetails() {
  return (
    <div className="bg-white w-full flex items-center justify-start gap-10">
      <Link
        to="/dashboard/profile"
        className="flex gap-3 hover:bg-stone-50 p-5 rounded-md"
      >
        <div>
          <User2 className="text-lime-500 bg-stone-50 hover:bg-lime-500 hover:text-white transition-colors ease-in-out size-10 p-2 rounded-md" />
        </div>

        <div>
          <h1 className="text-lime-500 font-bold text-[1.1rem]">
            Account Details
          </h1>
          <p className="text-[0.9rem] text-stone-500">
            Contact info, password, email and active sessions.
          </p>
        </div>
      </Link>

      <Link to="" className="flex gap-3 hover:bg-stone-50 p-5 rounded-md">
        <div>
          <Mail className="text-lime-500 bg-stone-50 hover:bg-lime-500 hover:text-white transition-colors ease-in-out size-10 p-2 rounded-md" />
        </div>

        <div>
          <h1 className="text-lime-500 font-bold text-[1.1rem]">
            Message Customization
          </h1>
          <p className="text-[0.9rem] text-stone-500">
            Customize any type of message you receive
          </p>
        </div>
      </Link>
    </div>
  );
}
