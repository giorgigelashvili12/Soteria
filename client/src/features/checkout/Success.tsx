import { useSearchParams, Link } from "react-router-dom";
import { ShieldCheck, ArrowLeft, Download, ExternalLink } from "lucide-react";
import "../../assets/styles/global.css";
import { receipt } from "./receipt";
//import { useState } from "react";
//import { Error } from "../messages/Error";

export default function Success() {
  const [searchParams] = useSearchParams();

  const amount = searchParams.get("amount") || "0.00";
  const merchant = searchParams.get("merchant") || "the merchant";
  const id = searchParams.get("intent")?.slice(-8).toUpperCase() || "TXN-7892";
  const base_redirect = searchParams.get("base_redirect") || "";
  console.log(base_redirect);

  //const [status, setStatus] = useState("");
  //const nav = useNavigate();

  const redirectUrl = searchParams.get("base_redirect");

  const goBack = () => {
    if (redirectUrl) {
      window.location.href = decodeURIComponent(redirectUrl);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6 font-sans">
      <div className="absolute top-0 left-0 w-full h-64 gradient-anim z-0" />

      <div className="w-full max-w-lg bg-white rounded-[2.5rem] shadow-2xl overflow-hidden z-10 border border-gray-100">
        <div className="pt-12 pb-8 flex flex-col items-center text-center px-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6 animate-in zoom-in duration-500">
            <ShieldCheck className="w-10 h-10 text-green-600" />
          </div>

          <h1 className="text-3xl font-black text-gray-900 mb-2 tracking-tight">
            Payment Verified
          </h1>
          <p className="text-gray-500 font-medium">
            Your transaction with{" "}
            <span className="text-gray-900">{merchant}</span> is complete.
          </p>
        </div>

        <div className="px-10 pb-10">
          <div className="bg-gray-50 rounded-3xl p-6 border border-gray-100 space-y-4">
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">
                Reference ID
              </span>
              <span className="text-gray-900 font-mono font-bold">#{id}</span>
            </div>

            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">
                Status
              </span>
              <span className="flex items-center gap-1.5 text-green-600 font-bold">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                Settled on Ledger
              </span>
            </div>

            <div className="pt-4 border-t border-gray-200 flex justify-between items-end">
              <div>
                <span className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">
                  Amount Paid
                </span>
                <p className="text-3xl font-black text-gray-900">${amount}</p>
              </div>
              <button
                onClick={() => receipt(id, merchant, Number(amount))}
                className="p-3 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors shadow-sm cursor-pointer"
              >
                <Download size={18} className="text-gray-600" />
              </button>
            </div>
          </div>

          <div className="mt-8 p-6 bg-emerald-600 rounded-3xl text-white relative overflow-hidden group cursor-pointer shadow-lg hover:shadow-emerald-200 transition-all">
            <div className="relative z-10">
              <h4 className="font-bold text-lg mb-1">
                Secure your own payments?
              </h4>
              <p className="text-blue-100 text-xs leading-relaxed opacity-90">
                Join Soteria today and protect your transactions with our
                system.
              </p>
            </div>
            <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:scale-110 transition-transform">
              <Link to="/">
                <ExternalLink size={40} />
              </Link>
            </div>
          </div>

          {redirectUrl ? (
            <button
              onClick={goBack}
              className="mt-6 w-full py-4 flex items-center justify-center gap-2 text-gray-400 font-bold hover:text-gray-900 transition-colors text-sm cursor-pointer"
            >
              <ArrowLeft size={16} />
              Return to {merchant}
            </button>
          ) : (
            <Link
              to={base_redirect}
              className="mt-6 w-full py-4 flex items-center justify-center gap-2 text-gray-400 font-bold hover:text-gray-900 transition-colors text-sm"
            >
              <ArrowLeft size={16} />
              Go Back
            </Link>
          )}
        </div>
      </div>

      <div className="mt-8 flex items-center gap-2 opacity-40">
        <div className="w-4 h-4 bg-black rounded flex items-center justify-center">
          <span className="text-[8px] text-white font-black">S</span>
        </div>
        <span className="text-xs font-bold tracking-[0.2em] uppercase text-gray-900">
          Soteria
        </span>
      </div>
    </div>
  );
}
