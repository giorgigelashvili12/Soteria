import { useEffect, useState, useCallback } from "react";

import type { IntentDetails } from "../@types";

import { useParams, useNavigate } from "react-router-dom";
import { Error as ErrMsg } from "../messages/Error";

const CheckoutPage = () => {
  const [status, setStatus] = useState<
    "loading" | "idle" | "processing" | "success" | "error"
  >("loading");
  const [details, setDetails] = useState<IntentDetails | null>(null);
  const nav = useNavigate();

  const { clientSecret } = useParams();

  const redirect = useCallback(
    (url?: string) => {
      if (!url) return;

      setTimeout(() => {
        if (url.startsWith("http")) {
          window.location.href = url;
        } else {
          nav(url);
        }
      }, 3000);
    },
    [nav],
  );

  useEffect(() => {
    const fetchIntent = async () => {
      try {
        const res = await fetch(
          `https://soteria-q27e.onrender.com/api/v1/payment-intent/${clientSecret}`,
        );
        if (!res.ok) throw new Error();
        const data = await res.json();

        setDetails(data);

        if (data.status === "succeeded") {
          setStatus("success");
          const params = new URLSearchParams({
            amount: (data.amount / 100).toFixed(2),
            merchant: data.merchantName,
            intent: clientSecret || "",
          }).toString();

          redirect(`${data.success_url}?${params}`);
        } else {
          setStatus("idle");
        }
      } catch (e: unknown) {
        ErrMsg("Unexpected error occured");
        console.error(e);
        setStatus("error");
      }
    };
    fetchIntent();
  }, [clientSecret, redirect]);

  const pay = async () => {
    setStatus("processing");
    try {
      const res = await fetch(
        "https://soteria-q27e.onrender.com/api/v1/payment-intent/confirm",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ client_secret: clientSecret }),
        },
      );

      const data = await res.json();

      if (res.ok) {
        setStatus("success");

        const successBase = details?.success_url || "/checkout/success";

        const params = new URLSearchParams({
          amount: ((details?.amount || 0) / 100).toFixed(2),
          merchant: details?.merchantName || "Merchant",
          intent: clientSecret || "",
          currency: details?.currency || "GEL",
          redirect_url: details?.success_url || "",
          base_redirect: details?.base_redirect || "",
        }).toString();

        setTimeout(() => {
          const finalUrl = `${successBase}${successBase.includes("?") ? "&" : "?"}${params}`;

          if (successBase.startsWith("http")) {
            window.location.href = finalUrl;
          } else {
            nav(finalUrl);
          }
        }, 3000);
      } else {
        const failedBase = details?.failed_url || "/checkout/failed";

        const failParams = new URLSearchParams({
          merchant: details?.merchantName || "Merchant",
          reason: data.msg || "Transaction Declined",
          return_to: window.location.href,
        }).toString();

        ErrMsg(data.msg || "Payment failed");
        setStatus("error");

        setTimeout(() => {
          const finalFailUrl = `${failedBase}${failedBase.includes("?") ? "&" : "?"}${failParams}`;
          if (failedBase.startsWith("http")) {
            window.location.href = finalFailUrl;
          } else {
            nav(finalFailUrl);
          }
        }, 2000);
      }
    } catch (e) {
      console.error(e);
      setStatus("error");
    }
  };

  if (status === "loading")
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-pulse text-gray-400 font-medium">
          Securing your session...
        </div>
      </div>
    );

  return (
    <div className="h-full">
      <div className="h-[85vh] bg-gray-50 flex items-center justify-center p-6">
        <div className="w-full max-w-xl grid grid-cols-1 gap-0 bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
          <div className="flex items-center gap-3 mb-6 p-3 bg-blue-50 rounded-xl border border-blue-100 mx-8 mt-8">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
              {details?.merchantName?.[0]}
            </div>
            <div>
              <p className="text-xs text-blue-600 font-bold uppercase tracking-wider">
                Paying Merchant
              </p>
              <div className="flex items-center gap-1">
                <p className="text-sm font-bold text-gray-900">
                  {details?.merchantName}
                </p>
                {details?.merchantVerified && (
                  <svg
                    className="w-4 h-4 text-blue-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293l-4 4a1 1 0 01-1.414 0l-2-2a1 1 0 111.414-1.414L9 10.586l3.293-3.293a1 1 0 111.414 1.414z" />
                  </svg>
                )}
              </div>
            </div>
          </div>

          {status === "success" ? (
            <div className="p-8 pb-12 flex flex-col items-center justify-center text-center animate-in fade-in zoom-in duration-300">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6 shadow-inner">
                <svg
                  className="w-10 h-10 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="3"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>

              <h2 className="text-2xl font-black text-gray-900 mb-2">
                Purchase Validated
              </h2>
              <p className="text-gray-500 text-sm max-w-xs mb-8">
                The payment for{" "}
                <strong>
                  {(details?.amount || 0) / 100}{" "}
                  {details?.currency.toUpperCase()}
                </strong>{" "}
                has been settled and verified on the ledger.
              </p>

              <div className="w-full max-w-sm space-y-4">
                <div className="flex items-center justify-center gap-3 text-blue-600 font-bold text-xs uppercase tracking-[0.2em]">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
                  </span>
                  Redirecting you back
                </div>

                <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-600 rounded-full transition-all duration-3000 ease-linear"
                    style={{ width: status === "success" ? "100%" : "0%" }}
                  />
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="p-8 border-b border-gray-100">
                <h2 className="text-xl font-bold text-gray-800 mb-6">
                  Order Summary
                </h2>
                <div className="space-y-4 mb-8">
                  {details?.items?.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex justify-between items-center text-sm"
                    >
                      <div className="flex flex-col">
                        <span className="font-semibold text-gray-700">
                          {item.name}
                        </span>
                        <span className="text-gray-400 text-xs">
                          Qty: {item.quantity}
                        </span>
                      </div>
                      <span className="font-medium text-gray-600">
                        {((item.price * item.quantity) / 100).toFixed(2)}{" "}
                        {details?.currency.toUpperCase()}
                      </span>
                    </div>
                  )) || (
                    <div className="text-sm text-gray-500 italic">
                      Standard Purchase
                    </div>
                  )}
                </div>

                <div className="pt-6 border-t border-dashed border-gray-200 space-y-2">
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>Subtotal</span>
                    <span>
                      {(details?.amount || 0) / 100}{" "}
                      {details?.currency.toUpperCase()}
                    </span>
                  </div>
                  <div className="flex justify-between text-xl font-black text-gray-900 pt-2">
                    <span>Total</span>
                    <span>
                      {(details?.amount || 0) / 100}{" "}
                      {details?.currency.toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-8 bg-gray-50/50">
                <button
                  onClick={pay}
                  disabled={status === "processing"}
                  className={`w-full py-4 rounded-xl font-bold text-white shadow-lg transition-all transform active:scale-[0.98] flex items-center justify-center gap-3 ${
                    status === "processing"
                      ? "bg-gray-400"
                      : "bg-black hover:bg-gray-800"
                  }`}
                >
                  {status === "processing" && (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  )}
                  {status === "processing" ? "Finalizing..." : `Pay Total Now`}
                </button>

                <p className="text-center text-[10px] text-gray-400 mt-4 leading-relaxed">
                  By clicking Pay, you agree to the terms of service. <br />
                  Your transaction is encrypted and ledger-protected.
                </p>

                {status === "error" && (
                  <div className="mt-4 p-3 bg-red-100 text-red-700 text-xs font-bold rounded-lg text-center">
                    Payment failed. Please check your balance and try again.
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      <div className="mt-8 flex flex-col items-center gap-2 opacity-60 hover:opacity-100 transition-opacity duration-300">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-gray-500 uppercase tracking-widest">
            Powered by
          </span>
          <div className="flex items-center gap-1">
            <div className="w-5 h-5 bg-black rounded flex items-center justify-center">
              <span className="text-[10px] text-white font-black">S</span>
            </div>
            <span className="text-sm font-black text-gray-900 tracking-tighter">
              SOTERIA
            </span>
          </div>
        </div>
        <div className="flex items-center gap-4 text-[10px] text-gray-400 font-medium">
          <span className="flex items-center gap-1">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                clipRule="evenodd"
              />
            </svg>
            Ensuring your safety, all the time, every time.
          </span>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
