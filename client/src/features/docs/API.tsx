import { useState, useEffect } from "react";
import { Menu, X, ChevronRight, Rocket } from "lucide-react";
import Intro from "./pages/Intro";
import Auth from "./pages/Auth";
import Product from "./pages/Products";
import Config from "./pages/Config";
import Front from "./pages/Front";

const API = () => {
  const [activeTab, setActiveTab] = useState("intro");
  const [expandedTab, setExpandedTab] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [activeTab]);

  const menuItems = [
    { id: "intro", label: "შესავალი" },
    { id: "auth", label: "ავტორიზაცია" },
    {
      id: "config",
      label: "კონფიგურაცია",
      subItems: [
        { id: "logic", label: "მოდულის ინსტალაცია" },
        { id: "setup", label: "ინიციალიზაცია" },
      ],
    },
    {
      id: "catalog",
      label: "კატალოგი",
      subItems: [
        { id: "test-mode", label: "პლატფორმაზე პროდუქტის დამატება" },
        { id: "checkout-logic", label: "ვირტუალური სალაროს სესიის შექმნა" },
        { id: "methods", label: "დამატებითი მეთოდები" },
        { id: "old", label: "ძველი მეთოდები" },
        { id: "delete", label: "წაშლა და განახლება" },
      ],
    },
    { id: "react", label: "React ინტეგრაცია" },
  ];

  const handleSubClick = (mainId: string, subId: string) => {
    setActiveTab(mainId);
    setIsMobileMenuOpen(false);

    setTimeout(() => {
      const element = document.getElementById(subId);
      if (element) {
        const offset = 80;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    }, 150);
  };

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-200 selection:bg-emerald-500/30">
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 z-50 flex items-center justify-between px-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-emerald-500 rounded flex items-center justify-center text-slate-950 font-black">
            S
          </div>
          <span className="font-black tracking-tighter text-white">
            SOTERIA
          </span>
        </div>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 text-slate-400 hover:text-white transition-colors"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <aside
        className={`
        fixed inset-y-0 left-0 z-40 w-72 bg-slate-900 border-r border-slate-800 p-6
        transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:sticky lg:top-0 lg:h-screen
        ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
      `}
      >
        <div className="hidden lg:flex items-center gap-3 mb-10 px-2 pb-6 border-b border-slate-800/50">
          <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl flex items-center justify-center text-slate-950 font-black shadow-lg shadow-emerald-500/20">
            S
          </div>
          <div>
            <div className="font-black tracking-tighter text-xl text-white leading-none">
              SOTERIA
            </div>
            <span className="text-emerald-500 text-[10px] font-bold uppercase tracking-widest">
              API Docs
            </span>
          </div>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto pr-2 custom-scrollbar">
          {menuItems.map((item) => (
            <div key={item.id} className="mb-2">
              <button
                onClick={() => {
                  setActiveTab(item.id);
                  setExpandedTab(expandedTab === item.id ? null : item.id);
                }}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 group ${
                  activeTab === item.id
                    ? "text-emerald-400 bg-emerald-500/10 border border-emerald-500/20"
                    : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-200"
                }`}
              >
                <span className="flex items-center gap-3">{item.label}</span>
                {item.subItems && (
                  <div
                    className={`transition-transform duration-200 ${expandedTab === item.id || activeTab === item.id ? "rotate-90" : ""}`}
                  >
                    <ChevronRight size={14} className="opacity-50" />
                  </div>
                )}
              </button>

              {item.subItems &&
                (activeTab === item.id || expandedTab === item.id) && (
                  <div className="ml-4 mt-1 border-l border-slate-800 space-y-1 py-1">
                    {item.subItems.map((sub) => (
                      <button
                        key={sub.id}
                        onClick={() => handleSubClick(item.id, sub.id)}
                        className="w-full text-left px-6 py-2 text-[13px] text-slate-500 hover:text-emerald-400 transition-colors relative flex items-center group"
                      >
                        <span className="absolute left-0 w-2 h-[1px] bg-slate-800 group-hover:bg-emerald-500/50"></span>
                        {sub.label}
                      </button>
                    ))}
                  </div>
                )}
            </div>
          ))}
        </nav>

        <div className="mt-auto pt-6 border-t border-slate-800/50">
          <div className="p-4 rounded-2xl bg-slate-950/50 border border-slate-800 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-emerald-500">
              <Rocket size={16} />
            </div>
            <div>
              <p className="text-[11px] text-slate-500 font-medium">
                Need help?
              </p>
              <a
                href="#"
                className="text-xs text-white hover:text-emerald-400 transition-colors font-bold"
              >
                Contact Support
              </a>
            </div>
          </div>
        </div>
      </aside>

      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <main className="flex-1 w-full lg:max-w-[calc(100vw-288px)]">
        <div className="px-6 py-24 md:px-12 md:py-16 max-w-5xl">
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            {activeTab === "intro" && <Intro />}
            {activeTab === "auth" && <Auth />}
            {activeTab === "config" && <Config />}
            {activeTab === "catalog" && <Product />}
            {activeTab === "react" && <Front />}
          </div>
        </div>
      </main>
    </div>
  );
};

export default API;
