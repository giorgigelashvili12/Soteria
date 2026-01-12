import { Link } from "react-router-dom";
import { Key } from "lucide-react";
import img1 from "../../src/assets/images/login.png";
import img2 from "../../src/assets/images/workspace.png";
import img3 from "../../src/assets/images/account.png";

export default function Auth() {
  return (
    <div>
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-4">
          <span className="px-2 py-1 rounded bg-emerald-500/10 text-emerald-500 text-[10px] font-bold uppercase tracking-widest border border-emerald-500/20">
            Setup Guide
          </span>
        </div>
        <h1 className="text-5xl font-black text-white mb-6 tracking-tight">
          ავტორიზაცია
        </h1>
        <p className="text-lg text-slate-400 max-w-2xl">
          Soteria API-სთან ინტეგრაციისთვის პირველ რიგში დაგჭირდებათ
          ავთენტიკაციის გასაღები (Passkey) და საიდუმლო გასაღები რომელიც ასევე
          აუცილებელია (Secret Key). მიჰყევით ქვემოთ მოცემულ ნაბიჯებს მის
          მისაღებად.
        </p>
      </div>

      <div className="space-y-6">
        <div className="group relative p-6 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-emerald-500/30 transition-all">
          <div className="flex gap-4">
            <div className="shrink-0 w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500 font-bold">
              1
            </div>
            <div>
              <h3 className="text-white font-bold mb-1">ექაუნთის შექმნა</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                დარეგისტრირდით პლატფორმაზე:{" "}
                <Link
                  to="/signup"
                  className="text-emerald-400 hover:underline font-medium"
                >
                  Signup
                </Link>
                . რეგისტრაციის შემდეგ ავტომატურად გადახვალთ მთავარ პანელზე.
              </p>
            </div>
          </div>

          <div className="mt-12 rounded-3xl border border-slate-800 bg-slate-900/30 p-2 overflow-hidden shadow-2xl">
            <div className="aspect-video bg-slate-800 flex items-center justify-center text-slate-600 italic">
              <img src={img1} />
            </div>
          </div>
        </div>

        <div className="group relative p-6 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-emerald-500/30 transition-all">
          <div className="flex gap-4">
            <div className="shrink-0 w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500 font-bold">
              2
            </div>
            <div>
              <h3 className="text-white font-bold mb-1">
                სამუშაო სივრცე (Workspace)
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                მარცხენა მენიუში (
                <code className="text-emerald-300 bg-emerald-500/5 px-1 rounded">
                  Sidebar
                </code>
                ) იპოვეთ თქვენი
                <code className="text-emerald-300 bg-emerald-500/5 px-1 rounded ml-1">
                  Workspace
                </code>
                . დააჭირეთ მასზე ჩამოსაშლელი მენიუს გამოსაჩენად.
              </p>
            </div>
          </div>
          <div className="mt-12 rounded-3xl border border-slate-800 bg-slate-900/30 p-2 overflow-hidden shadow-2xl">
            <div className="aspect-video bg-slate-800 flex items-center justify-center text-slate-600 italic">
              <img className="w-100" src={img2} />
            </div>
          </div>
        </div>

        <div className="group relative p-6 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-emerald-500/30 transition-all">
          <div className="flex gap-4">
            <div className="shrink-0 w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500 font-bold">
              3
            </div>
            <div>
              <h3 className="text-white font-bold mb-1">
                პარამეტრები და გასაღები
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">
                გადადით{" "}
                <code className="text-emerald-300 bg-emerald-500/5 px-1 rounded">
                  Settings
                </code>{" "}
                →{" "}
                <code className="text-emerald-300 bg-emerald-500/5 px-1 rounded ml-1">
                  Account Details
                </code>
                . აქ იპოვით შავ ველს, რომელშიც მოთავსებულია თქვენი უნიკალური
                გასაღებები.
              </p>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-500 uppercase tracking-tighter mb-1">
                  <Key size={12} /> ყურადღება
                </div>
                <p className="text-xs text-slate-500">
                  ეს გასაღებები გამოიყენება{" "}
                  <code className="text-slate-300">POST</code> მოთხოვნების
                  ავტორიზაციისთვის. არასოდეს გაუზიაროთ იგი მესამე პირს.
                </p>
              </div>
            </div>
          </div>
          <div className="mt-12 rounded-3xl border border-slate-800 bg-slate-900/30 p-2 overflow-hidden shadow-2xl">
            <div className="aspect-video bg-slate-800 flex items-center justify-center text-slate-600 italic">
              <img src={img3} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
