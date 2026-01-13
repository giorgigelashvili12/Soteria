import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const nav = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Products", href: "/" },
    { name: "Developers", href: "/api" },
    { name: "Resources", href: "/" },
    { name: "Pricing", href: "/" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-100 transition-all duration-300 border-b ${
        scrolled
          ? "bg-slate-950/80 backdrop-blur-md border-b border-slate-800 py-3 shadow-2xl"
          : "bg-transparent border-b border-transparent py-6 shadow-none"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center text-slate-950 font-black transition-transform group-hover:scale-110">
            S
          </div>
          <span className="font-black tracking-tighter text-xl text-white">
            SOTERIA
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className="text-sm font-medium text-slate-400 hover:text-emerald-400 transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-4">
          <Link
            to="/login"
            className="text-sm font-semibold text-slate-300 hover:text-white transition-colors"
          >
            Log in
          </Link>
          <button
            onClick={() => nav("/api")}
            className="px-5 py-2.5 bg-white text-slate-950 text-sm font-bold rounded-xl hover:bg-emerald-400 transition-all active:scale-95"
          >
            Get Started
          </button>
        </div>

        <button
          className="md:hidden text-slate-300"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <div
        className={`md:hidden absolute top-full left-0 right-0 bg-slate-900 border-b border-slate-800 transition-all duration-300 overflow-hidden ${
          isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-6 py-8 flex flex-col gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              onClick={() => setIsOpen(false)}
              className="text-lg font-medium text-slate-300"
            >
              {link.name}
            </Link>
          ))}
          <hr className="border-slate-800" />
          <button className="w-full py-4 bg-emerald-500 text-slate-950 font-bold rounded-xl">
            Get Started
          </button>
        </div>
      </div>
    </nav>
  );
}
