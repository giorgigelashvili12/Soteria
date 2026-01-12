import { useState } from "react";
import Intro from "./pages/Intro";
import Auth from "./pages/Auth";
import Product from "./pages/Products";
import Config from "./pages/Config";
import Front from "./pages/Front";

const API = () => {
  const [activeTab, setActiveTab] = useState("intro");
  const [expandedTab, setExpandedTab] = useState<string | null>(null);

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
    // { id: "node", label: "Node.js სერვერი" },
  ];

  const click = (mainId: string, subId: string) => {
    setActiveTab(mainId);
    setTimeout(() => {
      const element = document.getElementById(subId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  };

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-200 selection:bg-emerald-500/30">
      <aside className="w-64 border-r border-slate-800 bg-slate-900/50 h-screen sticky top-0 p-6 flex flex-col">
        <div className="flex items-center gap-2 mb-10 px-2 pb-4 border-b border-slate-800">
          <div className="w-8 h-8 bg-linear-to-br from-emerald-400 to-emerald-600 rounded flex items-center justify-center text-slate-950 font-black shadow-[0_0_15px_rgba(52,211,153,0.3)]">
            S
          </div>
          <span className="font-black tracking-tighter text-xl text-white">
            SOTERIA
            <span className="text-emerald-500 text-xs ml-1 font-bold">API</span>
          </span>
        </div>

        <nav className="flex-1 space-y-2">
          {menuItems.map((item) => (
            <div key={item.id}>
              <button
                onClick={() => {
                  setActiveTab(item.id);
                  setExpandedTab(expandedTab === item.id ? null : item.id);
                }}
                className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                  activeTab === item.id
                    ? "text-emerald-400 bg-emerald-500/10 border border-emerald-500/20"
                    : "text-slate-400 hover:bg-slate-800"
                }`}
              >
                {item.label}
              </button>

              {item.subItems &&
                (activeTab === item.id || expandedTab === item.id) && (
                  <div className="ml-6 mt-2 space-y-1 border-l border-slate-800 animate-in slide-in-from-top-2 duration-300">
                    {item.subItems.map((sub) => (
                      <button
                        key={sub.id}
                        onClick={() => click(item.id, sub.id)}
                        className="w-full text-left px-4 py-1.5 text-xs text-slate-500 hover:text-emerald-400 transition-colors"
                      >
                        {sub.label}
                      </button>
                    ))}
                  </div>
                )}
            </div>
          ))}
        </nav>

        <div className="pt-6 border-t border-slate-800">
          <a
            href="#"
            className="text-xs text-slate-500 hover:text-emerald-400 transition-colors"
          >
            Support & Help
          </a>
        </div>
      </aside>

      <main className="flex-1 p-12 max-w-5xl">
        <div className="max-w-3xl">
          {activeTab === "intro" && (
            <section className="animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="flex items-center gap-2 mb-4">
                <span className="px-2 py-1 rounded bg-emerald-500/10 text-emerald-500 text-[10px] font-bold uppercase tracking-widest">
                  Documentation
                </span>
                <span className="text-slate-600 text-xs">v1.0.0</span>
              </div>
              <Intro />
            </section>
          )}

          {activeTab === "auth" && (
            <section className="animate-in fade-in slide-in-from-bottom-4 duration-700">
              <Auth />
            </section>
          )}

          {activeTab === "config" && (
            <section className="animate-in fade-in slide-in-from-bottom-4 duration-700">
              <Config />
            </section>
          )}

          {activeTab === "catalog" && (
            <section className="animate-in fade-in slide-in-from-bottom-4 duration-700">
              <Product />
            </section>
          )}

          {activeTab === "react" && (
            <section className="animate-in fade-in slide-in-from-bottom-4 duration-700">
              <Front />
            </section>
          )}
        </div>
      </main>
    </div>
  );
};

export default API;
