import { useState, useEffect } from "react";
import "../../assets/styles/global.css";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Success } from "../messages/Success";
import { Error } from "../messages/Error";

export default function VerifyEmail() {
  const nav = useNavigate();
  const [searchParams] = useSearchParams();

  const [isVerifying, setIsVerifying] = useState(true);
  const [verified, setVerified] = useState(false);

  // const handleVerify = async () => {
  //   if (!token) {
  //     setStatus("missing required fields");
  //     return;
  //   }

  //   try {
  //     await axios.post(`http://localhost:33031/api/v1/auth/verify-email`, {
  //       withCredentials: true,
  //     });

  //     setStatus("email verified");
  //   } catch (e: unknown) {
  //     console.error(e);

  //     if (axios.isAxiosError(e)) {
  //       setStatus("email verified");
  //     } else {
  //       setStatus("failed");
  //     }
  //   }
  // };

  useEffect(() => {
    const verify = async (email: string, token: string) => {
      try {
        const res = await fetch(
          "https://soteria-back.vercel.app/api/v1/auth/verify-email",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, token }),
          },
        );

        const data = await res.json();

        if (res.ok) {
          setVerified(true);
          setIsVerifying(false);
          Success("Your email/account is verified!");
          setTimeout(() => nav("/dashboard"), 5000);
        } else {
          Error({
            title: "Couldn't Verify Your Email",
            description: (
              <ul className="list-disc list-inside text-sm">
                <li>{data.msg}</li>
              </ul>
            ),
          });
        }
      } catch (e) {
        Error({
          title: "Couldn't Verify Your Email",
          description: (
            <ul className="list-disc list-inside text-sm">
              <li>{String(e)}</li>
            </ul>
          ),
        });
        console.error("verification failed", e);
      } finally {
        setIsVerifying(false);
      }
    };

    const email = searchParams.get("email");
    const token = searchParams.get("token");

    if (email && token) {
      verify(email, token);
    } else {
      setIsVerifying(false);
    }
  }, [searchParams, nav]);

  return (
    <div>
      <div className="h-screen flex flex-col relative">
        <div className="h-1/2 w-full gradient-anim"></div>
        <div className="bg-white h-1/2 w-full"></div>
      </div>

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="bg-white shadow-[-2px_4px_49px_-5px_rgba(0,0,0,0.2)] w-140 h-75 p-20 rounded-md">
          {/*<h2>Email Verification</h2>
          <input
            type="email"
            placeholder="Your email here"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter your token here"
            value={token}
            onChange={(e) => setToken(e.target.value)}
          />
          <button onClick={handleVerify}>Verify</button>
          <p>{status}</p>*/}
          <div>
            <h2 className="text-2xl font-bold">
              {isVerifying
                ? "Verifying your Soteria account..."
                : verified
                  ? "Email Verified!"
                  : "Email Verification Failed"}
            </h2>
            <br />
            <p className="text-gray-600">
              {isVerifying && "Please wait while we secure your session."}
              {verified &&
                "Your identity has been confirmed. You can now access all features."}
              {!isVerifying &&
                !verified &&
                "The link may be expired or invalid, or you're verified!"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
