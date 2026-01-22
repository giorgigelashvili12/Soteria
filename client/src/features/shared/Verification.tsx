import { useEffect, useState } from "react";
import { Globe, ArrowRight, CheckCircle2, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Success } from "../messages/Success";
import { Error as ErrMsg } from "../messages/Error";

export default function Verification() {
  const [loading, setLoading] = useState(false);
  const [urls, setUrls] = useState({
    success: "",
    failed: "",
    base_redirect: "",
  });
  const [show, setShow] = useState(false);
  const [saved, isSaved] = useState(false);
  const nav = useNavigate();

  useEffect(() => {
    const fetchCurrentConfig = async () => {
      try {
        const res = await fetch(
          "https://soteria-q27e.onrender.com/api/v1/merchant/me",
          {
            credentials: "include",
          },
        );
        if (res.ok) {
          const data = await res.json();
          setUrls({
            success: data.success_url || "",
            failed: data.failed_url || "",
            base_redirect: data.base_redirect || "",
          });
        }
      } catch (e) {
        console.error("New merchant - no config found.");
        console.error(e);
      }
    };
    fetchCurrentConfig();
  }, []);

  const handleSaveAttempt = () => {
    const urlPattern = /^https?:\/\/.+/;

    if (urls.success && !urlPattern.test(urls.success))
      return ErrMsg("Invalid Success URL");
    if (urls.failed && !urlPattern.test(urls.failed))
      return ErrMsg("Invalid Failed URL");
    if (urls.base_redirect && !urlPattern.test(urls.base_redirect))
      return ErrMsg("Invalid Base Redirect URL");

    if (!urls.success || !urls.failed || !urls.base_redirect) {
      setShow(true);
    } else {
      saveData();
    }
  };

  const saveData = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        "https://soteria-q27e.onrender.com/api/v1/payment-intent/url-config",
        {
          method: "POST",

          credentials: "include",

          body: JSON.stringify({
            success_url: urls.success,
            failed_url: urls.failed,
            base_redirect: urls.base_redirect,
          }),
        },
      );

      if (res.ok) {
        isSaved(true);
        Success("Configurations saved successfully");
        setTimeout(() => nav("/dashboard"), 2000);
      } else {
        ErrMsg("Server error: Could not save URLs");
      }
    } catch (e) {
      ErrMsg("Network error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-170 bg-gray-50 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-lg bg-white rounded-[2.5rem] shadow-2xl p-10 border border-gray-100">
        <div className="mb-8">
          <div className="w-12 h-12 bg-emerald-700 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg">
            <Globe size={24} />
          </div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">
            Redirection Setup
          </h1>
          <p className="text-gray-500 font-medium mt-1">
            Connect your store to the Soteria gateway.
          </p>
        </div>

        <div className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">
              Success Page
            </label>
            <input
              className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-black outline-none transition-all placeholder:text-gray-300 font-medium"
              placeholder="https://mysite.com/success"
              value={urls.success}
              onChange={(e) => setUrls({ ...urls, success: e.target.value })}
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">
              Failure Page
            </label>
            <input
              className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-black outline-none transition-all placeholder:text-gray-300 font-medium"
              placeholder="https://mysite.com/failed"
              value={urls.failed}
              onChange={(e) => setUrls({ ...urls, failed: e.target.value })}
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">
              Merchant Home (Base Redirect)
            </label>
            <div className="relative">
              <input
                className="w-full p-4 pr-12 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-black outline-none transition-all placeholder:text-gray-300 font-medium"
                placeholder="https://mysite.com"
                value={urls.base_redirect}
                onChange={(e) =>
                  setUrls({ ...urls, base_redirect: e.target.value })
                }
              />
              <Home
                size={18}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300"
              />
            </div>
          </div>

          <button
            onClick={handleSaveAttempt}
            disabled={loading || saved}
            className={`w-full py-4 rounded-2xl font-bold shadow-xl transition-all flex items-center justify-center gap-2 mt-4 cursor-pointer ${
              saved
                ? "bg-emerald-500 text-white"
                : "bg-emerald-700 text-white hover:bg-gray-800"
            }`}
          >
            {loading ? (
              "Synchronizing..."
            ) : saved ? (
              <>
                <CheckCircle2 size={20} /> Saved
              </>
            ) : (
              <>
                <ArrowRight size={18} /> Complete Integration
              </>
            )}
          </button>
        </div>
      </div>

      {show && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center p-6 z-50">
          <div className="bg-white rounded-[3rem] p-10 max-w-sm w-full shadow-2xl animate-in zoom-in duration-300">
            <h3 className="text-2xl font-black text-gray-900 mb-3">
              Soteria Pages
            </h3>
            <p className="text-gray-500 text-sm leading-relaxed mb-8">
              You haven't provided all URLs. We will use the{" "}
              <strong>Soteria Default Pages</strong> to show your customers
              their receipts.
            </p>
            <div className="space-y-3">
              <button
                onClick={() => {
                  setShow(false);
                  saveData();
                }}
                className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-bold hover:bg-emerald-700 transition-all cursor-pointer shadow-lg shadow-emerald-100"
              >
                Use Defaults
              </button>
              <button
                onClick={() => setShow(false)}
                className="w-full py-2 text-gray-400 font-bold text-sm cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
