import { useState, useEffect } from "react";
import "../../assets/styles/global.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { Success } from "../messages/Success";
import { Error } from "../messages/Error";

export default function VerifyPin() {
  const nav = useNavigate();
  const [searchParams] = useSearchParams();

  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");

  const [isVerifying, setIsVerifying] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const emailParam = searchParams.get("email");
    if (emailParam) {
      setEmail(emailParam);
    }
  }, [searchParams]);

  const verify = async () => {
    if (!token) {
      Error({
        title: "Error Verifying",
        description: (
          <ul className="list-disc list-inside text-sm">
            <li>PIN code is required!</li>
          </ul>
        ),
      });
      return;
    } else if (!email) {
      Error({
        title: "Error Verifying",
        description: (
          <ul className="list-disc list-inside text-sm">
            <li>Email not linked. Try again another time</li>
          </ul>
        ),
      });
    }

    setIsVerifying(true);

    try {
      const res = await axios.post(
        "https://soteria-back.vercel.app/api/v1/auth/verify-email",
        { email, token },
        { withCredentials: true },
      );

      if (res.status === 200) {
        setShowSuccess(true);
        Success("Account verified successfully!");
        setTimeout(() => nav("/dashboard"), 5000);
      }
    } catch (e) {
      console.error(e);
      Error({
        title: "Error Verifying",
        description: (
          <ul className="list-disc list-inside text-sm">
            <li>Unexpected error</li>
          </ul>
        ),
      });
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div>
      <div className="h-screen flex flex-col relative">
        <div className="h-1/2 w-full gradient-anim"></div>
        <div className="bg-white h-1/2 w-full"></div>
      </div>

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="bg-white shadow-[-2px_4px_49px_-5px_rgba(0,0,0,0.2)] w-140 p-12 rounded-md text-center">
          <h2 className="text-2xl font-bold mb-2">
            {showSuccess
              ? "Verification Complete"
              : "Enter your verification code"}
          </h2>
          <br />
          {!showSuccess && email && (
            <p className="text-sm text-gray-500 mb-6">
              Verifying for: <span className="font-semibold">{email}</span>
            </p>
          )}

          {!showSuccess && (
            <div className="flex flex-col gap-5">
              <input
                className="border-2 border-gray-200 p-4 rounded-lg text-center text-2xl tracking-widest font-mono focus:border-black outline-none transition-all"
                type="text"
                maxLength={6}
                placeholder="000000"
                value={token}
                onChange={(e) => setToken(e.target.value)}
              />
              <button
                className="cursor-pointer bg-linear-to-r from-green-500 to-teal-600 hover:bg-linear-to-r hover:from-teal-600 hover:to-green-500 duration-200 ease-in-out text-white py-4 rounded-lg font-bold hover:bg-gray-800 transition-colors disabled:bg-gray-400"
                onClick={verify}
                disabled={isVerifying}
              >
                {isVerifying ? "Verifying..." : "Verify Identity"}
              </button>
            </div>
          )}

          {showSuccess && (
            <div className="py-4">
              <p className="text-gray-600">
                Your email was successfully verified!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
