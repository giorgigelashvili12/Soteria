import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Spinner } from "@/components/ui/spinner";

import { Button } from "@/components/ui/button";
import { Error } from "../messages/Error";

export default function Login() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const nav = useNavigate();

  const emailEmpty = email.trim() === "";
  const passEmpty = pass.trim() === "";
  const [submited, setSubmited] = useState(false);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const check = async () => {
      try {
        const res = await fetch(
          `https://soteria-q27e.onrender.com/api/v1/auth/profile`,
          {
            method: "GET",
            credentials: "include",
          },
        );

        if (res.ok) nav("/dashboard");
      } catch (e) {
        console.error(e);
      }
    };

    check();
  }, [nav]);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (emailEmpty || passEmpty) {
      setSubmited(true);
      Error({
        title: "Missing Required Fields",
        description: (
          <ul className="list-disc list-inside text-sm">
            <li>Please, enter every field to proceed.</li>
          </ul>
        ),
      });
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(
        `https://soteria-q27e.onrender.com/api/v1/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password: pass,
          }),
          credentials: "include",
        },
      );

      const data = await res.json();
      if (res.ok) {
        alert("signup success");
        localStorage.setItem("user", JSON.stringify(data.data.id));
        localStorage.setItem("email", JSON.stringify(data.data.email));
        nav("/");
      } else {
        Error({
          title: "Error signing up",
          description: (
            <ul className="list-disc list-inside text-sm">
              <li>{data.msg || "Already exists, or invalid credentials"}</li>
            </ul>
          ),
        });
      }
    } catch (e: unknown) {
      alert("error loggin in");
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex justify-center items-center gap-15">
        <div className="shadow-[-2px_4px_49px_-5px_rgba(0,0,0,0.2)] h-full p-15">
          <form onSubmit={submit}>
            <div className="">
              <h2 className="text-3xl font-medium border-b border-stone-400 pb-5">
                Log Into Your Soteria Account
              </h2>
            </div>

            <div className="flex flex-col items-center mt-1 gap-0">
              <div>
                <label>Email</label>
                <br />
                <input
                  className={`w-100 border p-2 rounded-md outline-1 mt-2 transition-colors duration-200 ease-in-out
                    ${
                      submited && emailEmpty
                        ? "border-red-500"
                        : "border-stone-200 focus:border-blue-500"
                    }
                  `}
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <p
                  className={`text-sm text-red-500
                      transform transition-all duration-200
                      ${
                        submited && emailEmpty
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 -translate-y-1"
                      }
                    `}
                >
                  Email is required!
                </p>
              </div>

              <div>
                <label>Password</label>
                <br />
                <input
                  className={`w-100 border p-2 rounded-md outline-1 mt-2 transition-colors duration-200 ease-in-out
                    ${
                      submited && passEmpty
                        ? "border-red-500"
                        : "border-stone-200 focus:border-blue-500"
                    }
                  `}
                  type="password"
                  value={pass}
                  onChange={(e) => setPass(e.target.value)}
                />

                <p
                  className={`text-sm text-red-500
                      transform transition-all duration-200
                      ${
                        submited && passEmpty
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 -translate-y-1"
                      }
                    `}
                >
                  Password is required!
                </p>
              </div>

              <button
                className="flex transition-colors duration-200 ease-in-out justify-center items-center bg-linear-to-r from-green-500 to-teal-600 w-100 py-3 text-md text-white rounded-md cursor-pointer hover:bg-linear-to-r hover:from-teal-600 hover:to-green-500 "
                type="submit"
                onClick={() => setSubmited(true)}
              >
                {loading ? <Spinner className="h-5 w-5" /> : "Log In"}
              </button>
            </div>
          </form>

          <div className="mt-5 border-t border-stone-400">
            <p className="text-center pt-5">
              Don't have an account?{" "}
              <Link className="text-blue-400 underline" to="/signup">
                Sign Up
              </Link>
            </p>

            <Button className="w-100 py-5 mt-3 bg-white text-stone-800 border border-stone-400 hover:text-white">
              <Link
                className="flex gap-3 items-center  w-100 py-2 justify-center rounded-md"
                to="http://localhost:33031/api/v1/oauth/google"
              >
                <img className="w-5" src="src/assets/images/google-logo.webp" />

                <span>Log in with Google</span>
              </Link>
            </Button>
          </div>
        </div>

        <div className="h-full w-100 flex flex-col gap-10">
          <div className="">
            <span className="border-l-8 border-emerald-700 pl-2 font-bold text-3xl">
              Long Time No See!
            </span>
            <p className="mt-5 text-xl">
              Log back into your account to catch up with your work and
              statistics.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
