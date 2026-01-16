import { ArrowRight, Terminal } from "lucide-react";
import Header from "./home/Header";

export default function HomePage() {
  return (
    <div>
      <Header />
      <div className="bg-slate-950 min-h-screen text-slate-200 selection:bg-emerald-500/30 overflow-x-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-125 bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-slate-800 to-transparent" />

        <header className="relative pt-32 pb-20 px-6 max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium mb-6 animate-fade-in">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            v1.1.0 is now live
          </div>

          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight">
            Secure Your Payments <br />
            <span className="bg-linear-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent">
              With Soteria
            </span>
          </h1>

          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Payment infrastructure to grow your revenue, join other businesses,
            handle online payments with integrated services
          </p>

          {/*<div className="flex flex-col justify-center w-full items-center">
            {" "}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
              <button
                onClick={() => nav("/api")}
                className="w-full sm:w-auto px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] flex items-center justify-center gap-2 group"
              >
                Get Started
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </button>
              <button className="w-full sm:w-auto px-8 py-4 bg-slate-900 border border-slate-800 hover:bg-slate-800 text-white font-bold rounded-xl transition-all">
                View Demo
              </button>
            </div>
            <div className="w-full mt-8 bg-slate-950 rounded-xl p-4 font-mono text-sm text-emerald-300 border border-slate-800 max-w-sm text-center">
              <span className="text-slate-500 mr-2">$</span>
              npm i https://github.com/giorgigelashvili12/Soteria-SDK
            </div>
          </div>*/}
        </header>

        <section className="max-w-7xl mx-auto px-6 pb-32">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 p-8 rounded-3xl bg-slate-900/50 border border-slate-800 hover:border-emerald-500/30 transition-all group relative overflow-hidden">
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-emerald-500/5 blur-3xl group-hover:bg-emerald-500/10 transition-colors" />

              <Terminal className="text-emerald-400 mb-4" size={32} />
              <h3 className="text-2xl font-bold text-white mb-2">
                Built for the Love of Clean Code
              </h3>
              <p className="text-slate-400 max-w-lg">
                Inspiration of payments and complex systems. This one especially
                designed to simplify your work, keep track safely and speedy.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                {[
                  "TypeScript",
                  "React",
                  "Tailwind CSS",
                  "Node.js",
                  "Lucide",
                ].map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 rounded-full bg-slate-950 border border-slate-800 text-xs text-slate-300 font-mono"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-slate-900/50 border border-slate-800 hover:border-blue-500/30 transition-all flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 rounded-full bg-linear-to-tr from-blue-500 to-emerald-500 mb-4 flex items-center justify-center text-white font-bold text-xl shadow-lg group-hover:scale-110 transition-transform">
                  JS
                </div>
                <h3 className="text-xl font-bold text-white mb-1">
                  The Architect
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Time and myself
                </p>
              </div>
              <a
                href="https://github.com/giorgigelashvili12"
                target="_blank"
                className="mt-4 text-xs font-bold text-blue-400 hover:text-blue-300 flex items-center gap-2"
              >
                FOLLOW ME ON GITHUB <ArrowRight size={14} />
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
