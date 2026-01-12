import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Copy,
  Check,
  Key,
  Mail,
  Building,
  //Activity,
} from "lucide-react";
import type { MerchantI } from "../../../../server/src/interfaces/Merchant.interface";

export default function Profile() {
  const [merchant, setMerchant] = useState<MerchantI | null>(null);
  const [copied, setCopied] = useState(false);
  const nav = useNavigate();

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const res = await fetch(
          "https://soteria-q27e.onrender.com/api/v1/auth/profile",
          {
            credentials: "include",
          },
        );
        const data = await res.json();
        if (res.ok) {
          setMerchant(data.merchant);
        } else {
          nav("/login");
        }
      } catch (e) {
        console.error("Error loading profile:", e);
        nav("/login");
      }
    };
    loadProfile();
  }, [nav]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!merchant) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-black text-gray-900">
              Merchant Settings
            </h1>
            <p className="text-gray-500 text-sm">
              Manage your Soteria credentials and account details.
            </p>
          </div>
          {/*<div className="flex items-center gap-2 bg-green-100 px-3 py-1 rounded-full border border-green-200">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-xs font-bold text-green-700 uppercase">
              Live System
            </span>
          </div>*/}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                <Building className="w-5 h-5 text-gray-400" />
                Organization Details
              </h3>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    Business Name
                  </label>
                  <p className="text-gray-900 font-semibold mt-1">
                    {merchant.legalName}
                  </p>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    Contact Email
                  </label>
                  <p className="text-gray-900 font-semibold mt-1 flex items-center gap-2">
                    <Mail className="w-4 h-4 text-gray-400" />
                    {merchant.email}
                  </p>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    Verification Status
                  </label>
                  <div className="mt-1 flex items-center gap-2">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${merchant.status === "approved" ? "bg-blue-100 text-blue-700" : "bg-yellow-100 text-yellow-700"}`}
                    >
                      {merchant.status}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-black rounded-2xl p-6 shadow-xl text-white">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold flex items-center gap-2">
                  <Key className="w-5 h-5 text-blue-400" />
                  API Access Key
                </h3>
              </div>

              <p className="text-gray-400 text-xs mb-6 leading-relaxed">
                use this passkey in your{" "}
                <code className="text-blue-300">POST</code> requests to
                authenticate. This is a secret code, so don't show it to the
                client-side code
              </p>

              <div className="relative group">
                <div className="bg-gray-900 rounded-xl p-4 border border-gray-800 font-mono text-sm break-all pr-12 text-blue-100">
                  {merchant.passkey || "sk_live_********************"}
                </div>
                <button
                  onClick={() => copyToClipboard(merchant.passkey)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2 hover:bg-gray-800 rounded-lg transition-colors"
                >
                  {copied ? (
                    <Check className="w-5 h-5 text-green-400" />
                  ) : (
                    <Copy className="w-5 h-5 text-gray-400" />
                  )}
                </button>
              </div>

              <div>
                <div className="relative group">
                  <div className="bg-gray-900 rounded-xl p-4 border border-gray-800 font-mono text-sm pr-12 text-red-100/80 filter blur-xs hover:blur-none transition-all duration-300">
                    {merchant.secret_key || "sk_live_67823...not_configured"}
                  </div>
                  <button
                    onClick={() => copyToClipboard(merchant.secret_key)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 hover:bg-gray-800 rounded-lg transition-colors text-gray-400"
                  >
                    {copied ? (
                      <Check className="w-4 h-4 text-green-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
                <p className="mt-3 text-[10px] text-gray-500 italic">
                  Never share this key, used to sign your{" "}
                  <code className="text-gray-300 font-bold">
                    createCheckout
                  </code>{" "}
                  requests.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {/*<div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-sm font-bold mb-4 flex items-center gap-2">
                <Activity className="w-4 h-4 text-blue-500" />
                Integration Status
              </h3>
              <ul className="space-y-4">
                <li className="flex items-center justify-between text-xs">
                  <span className="text-gray-500">API Access</span>
                  <span className="text-green-600 font-bold">Enabled</span>
                </li>
                <li className="flex items-center justify-between text-xs">
                  <span className="text-gray-500">Environment</span>
                  <span className="text-gray-900 font-bold">Production</span>
                </li>
              </ul>
            </div>*/}

            <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100">
              <p className="text-[11px] text-blue-700 leading-relaxed font-medium">
                <strong>Documentation:</strong> Send <code>product_id</code> and{" "}
                <code>passkey</code> to <code>/api/v1/payment-intent</code> to
                generate a checkout session.
              </p>
            </div>
          </div>
        </div>

        {/*<div className="mt-12 text-center">
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em]">
            Soteria Ledger Protected Platform
          </p>
        </div>*/}
      </div>
    </div>
  );
}
