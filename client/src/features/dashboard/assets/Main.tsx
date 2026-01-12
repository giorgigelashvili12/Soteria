import TawkChat from "@/features/shared/TawkChat";
import Header from "./Header";
//@ts-expect-error ar vici ra tipis componentia, JSX.Component ar mushaobs.
export default function Main({ children }) {
  return (
    <div className="w-full flex flex-col">
      <Header />
      <TawkChat />
      <div className="p-6">{children}</div>
    </div>
  );
}
