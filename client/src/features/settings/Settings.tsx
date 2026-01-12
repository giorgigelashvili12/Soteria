import PersonalDetails from "./assets/PersonalDetails";
import AccountSettings from "./assets/AccountSettings";

export default function Settings() {
  return (
    <div className="bg-white">
      <div className="px-5 py-7">
        <span className="text-[1.15rem] font-semibold mx-6 text-stone-600">
          Personal Details
        </span>
        <PersonalDetails />
      </div>

      <div className="px-5 py-7">
        <span className="text-[1.15rem] font-semibold mx-6 text-stone-600">
          Account Settings
        </span>
        <AccountSettings />
      </div>
    </div>
  );
}
