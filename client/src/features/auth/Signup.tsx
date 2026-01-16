import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Spinner } from "@/components/ui/spinner";

import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronsUpDown } from "lucide-react";
import { Error } from "../messages/Error";
import { Success } from "../messages/Success";

const countries = [
  "Austria",
  "Belgium",
  "Bulgaria",
  "Croatia",
  "Cyprus",
  "Czech Republic",
  "Denmark",
  "Estonia",
  "Finland",
  "France",
  "Germany",
  "Greece",
  "Hungary",
  "Ireland",
  "Italy",
  "Latvia",
  "Lithuania",
  "Luxembourg",
  "Malta",
  "Netherlands",
  "Poland",
  "Portugal",
  "Romania",
  "Slovakia",
  "Slovenia",
  "Spain",
  "Sweden",
  "United Kingdom",
  "Georgia",
  "United States",
];

export default function Signup() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [name, setName] = useState("");
  const nav = useNavigate();

  const emailEmpty = email.trim() === "";
  const passEmpty = pass.trim() === "";
  const nameEmpty = name.trim() === "";
  const [submited, setSubmited] = useState(false);

  const [open, setOpen] = React.useState(false);
  const [country, setCountry] = React.useState<string | null>(null);
  const countryEmpty = !country;

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

    if (emailEmpty || passEmpty || nameEmpty || countryEmpty) {
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
        `https://soteria-q27e.onrender.com/api/v1/auth/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password: pass,
            country,
            legalName: name,
          }),
          credentials: "include",
        },
      );

      const data = await res.json();
      if (res.ok) {
        Success("Account created successfully!");
        localStorage.setItem("user", JSON.stringify(data.data.id));
        localStorage.setItem("email", JSON.stringify(data.data.email));
        setInterval(() => nav("/dashboard"), 1000);
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
        <div className="h-full w-100 flex flex-col gap-10">
          <div className="">
            <span className="border-l-2 border-emerald-700 pl-2 font-bold">
              1. Get started
            </span>
            <p className="pl-5">
              Set up your own workspace with your preferences. Adapt with the
              new environment we will make for you.
            </p>
          </div>

          <div>
            <span className="border-l-2 border-emerald-700 pl-2 font-bold">
              2. Start with your first payment
            </span>
            <p className="pl-5">
              Set up a pipeline, add customers and proceed working with real
              money
            </p>
          </div>

          <div>
            <span className="border-l-2 border-emerald-700 pl-2 font-bold">
              3. Set up your business
            </span>
            <p className="pl-5">
              Use tools offered by us, integrate it in your applications to make
              everything easier. Join other businesses out in the world!
            </p>
          </div>
        </div>

        <div className="shadow-[-2px_4px_49px_-5px_rgba(0,0,0,0.2)] h-full p-15">
          <form onSubmit={submit}>
            <div className="">
              <h2 className="text-3xl font-medium border-b border-stone-400 pb-5">
                Create Your Soteria Account
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

              <div>
                <label>Your Name</label>
                <br />
                <input
                  className={`w-100 border p-2 rounded-md outline-1 mt-2 transition-colors duration-200 ease-in-out
                    ${
                      submited && nameEmpty
                        ? "border-red-500"
                        : "border-stone-200 focus:border-blue-500"
                    }
                  `}
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />

                <p
                  className={`text-sm text-red-500
                      transform transition-all duration-200
                      ${
                        submited && nameEmpty
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 -translate-y-1"
                      }
                    `}
                >
                  Your name is required!
                </p>
              </div>

              <div>
                <label>Country</label>
                <br />
                <Collapsible
                  open={open}
                  onOpenChange={setOpen}
                  className={`w-100 border rounded-md pt-1 pb-1 mt-2
                      transition-colors duration-200 ease-in-out
                      ${
                        submited && countryEmpty
                          ? "border-red-500"
                          : "border-stone-200"
                      }
                    `}
                >
                  <CollapsibleTrigger asChild>
                    <Button
                      variant="ghost"
                      className="flex w-100 items-center justify-between"
                    >
                      <span
                        className={
                          country ? "text-foreground" : "text-muted-foreground"
                        }
                      >
                        {country ?? "Select country"}
                      </span>

                      <ChevronsUpDown
                        className={`h-4 w-4 transition-transform duration-200
                            ${open ? "rotate-180" : ""}
                          `}
                      />
                    </Button>
                  </CollapsibleTrigger>

                  <CollapsibleContent className="border-t bg-white">
                    <div className="max-h-64 overflow-y-auto">
                      {countries.map((c) => (
                        <button
                          key={c}
                          onClick={() => {
                            setCountry(c);
                            setOpen(false);
                          }}
                          className="flex w-full px-4 py-2 text-left text-sm hover:bg-muted"
                        >
                          {c}
                        </button>
                      ))}
                    </div>
                  </CollapsibleContent>
                </Collapsible>

                <p
                  className={`text-sm text-red-500 mt-1
                      transition-opacity duration-200 ease-in-out
                      ${submited && countryEmpty ? "opacity-100" : "opacity-0"}
                    `}
                >
                  Country is required!
                </p>
              </div>

              <button
                className="flex transition-colors duration-200 ease-in-out justify-center items-center bg-linear-to-r from-green-500 to-teal-600 w-100 py-3 text-md text-white rounded-md cursor-pointer hover:bg-linear-to-r hover:from-teal-600 hover:to-green-500 "
                type="submit"
                onClick={() => setSubmited(true)}
              >
                {loading ? <Spinner className="h-5 w-5" /> : "Sign Up"}
              </button>
            </div>
          </form>

          <div className="mt-5 border-t border-stone-400">
            <p className="text-center pt-5">
              Already have an account?{" "}
              <Link className="text-blue-400 underline" to="/login">
                Log In
              </Link>
            </p>

            <Button className="w-100 py-5 mt-3 bg-white text-stone-800 border border-stone-400 hover:text-white">
              <Link
                className="flex gap-3 items-center  w-100 py-2 justify-center rounded-md"
                to="https://soteria-q27e.onrender.com/api/v1/oauth/google"
              >
                <img className="w-5" src="src/assets/images/google-logo.webp" />

                <span>Sign up with Google</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
