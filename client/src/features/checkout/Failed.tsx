import { useSearchParams, useNavigate } from "react-router-dom";
import { AlertCircle, RefreshCw, ArrowLeft, MessageCircle } from "lucide-react";

export default function Failed() {
  const [searchParams] = useSearchParams();
  const nav = useNavigate();

  const merchant = searchParams.get("merchant") || "the merchant";
  const errorMsg =
    searchParams.get("reason") || "The transaction was declined or cancelled.";

  const returnTo = searchParams.get("return_to");

  const goback = () => {
    if (returnTo) {
      window.location.href = decodeURIComponent(returnTo);
    } else {
      nav(-1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6 font-sans">
      <div className="absolute top-0 left-0 w-full h-2 bg-red-500 z-20" />

      <div className="w-full max-w-lg bg-white rounded-[2.5rem] shadow-2xl overflow-hidden z-10 border border-gray-100">
        <div className="pt-12 pb-8 flex flex-col items-center text-center px-8">
          <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mb-6 animate-pulse">
            <AlertCircle className="w-10 h-10 text-red-600" />
          </div>

          <h1 className="text-3xl font-black text-gray-900 mb-2 tracking-tight">
            Payment Incomplete
          </h1>
          <p className="text-gray-500 font-medium px-4">
            We couldn't finalize your payment to{" "}
            <span className="text-gray-900">{merchant}</span>.
          </p>
        </div>

        <div className="px-10 pb-10">
          <div className="bg-red-50/50 rounded-3xl p-6 border border-red-100 mb-8">
            <p className="text-red-700 text-sm font-semibold text-center leading-relaxed">
              {errorMsg}
            </p>
          </div>

          <div className="space-y-3">
            <button
              onClick={goback}
              className="w-full cursor-pointer py-4 bg-emerald-600 border border-emerald-600 text-white rounded-2xl font-bold shadow-xl hover:bg-white hover:text-emerald-600 transition-all flex items-center justify-center gap-3"
            >
              <RefreshCw size={18} />
              Try Paying Again
            </button>

            <button
              onClick={goback}
              className="w-full py-4 bg-white cursor-pointer border border-gray-200 text-gray-700 rounded-2xl font-bold hover:bg-gray-50 transition-all flex items-center justify-center gap-3"
            >
              <ArrowLeft size={18} />
              Return to Checkout
            </button>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                <MessageCircle size={18} className="text-gray-600" />
              </div>
              <div>
                <p className="text-xs font-black text-gray-900 uppercase tracking-widest">
                  Need Help?
                </p>
              </div>
            </div>
            <a
              href="https://www.facebook.com/giorgi.gelashvili.969300/"
              target="_blank"
              rel="noreferrer"
              className="text-xs font-bold text-green-600 hover:underline"
            >
              Click Here
            </a>
          </div>
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
