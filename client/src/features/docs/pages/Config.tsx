import CodeWindow from "../assets/CodeWindow";
import { installCode } from "../assets/codes";
import { importCodeJS } from "../assets/codes";
import { configCode, config1 } from "../assets/codes";

export default function Config() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 md:py-12 text-slate-300">
      <section id="logic" className="mb-16 md:mb-24">
        <div className="flex items-center gap-2 mb-6">
          <span className="px-2 py-1 rounded bg-emerald-500/10 text-emerald-500 text-[10px] font-bold uppercase tracking-widest border border-emerald-500/20">
            Production
          </span>
          <span className="text-slate-600 text-xs font-medium">v1.1.0</span>
        </div>

        <h2 className="text-2xl md:text-3xl font-black text-white mb-5 tracking-tight">
          მოდულის ინსტალაცია
        </h2>

        <p className="text-slate-400 leading-relaxed mb-6">
          გამოიყენეთ ეს კომანდი რათა დააყენოთ მოდული (განახლებულ ვერსიაში არის
          უსაფრთხო გზით მუშაობა დამატებული, ამიტომ{" "}
          <code className="text-emerald-400">crypto</code> მოდული საჭიროა)
        </p>

        <div className="mb-10">
          <CodeWindow code={installCode} />
        </div>

        <p className="text-slate-400 mb-4">
          დააიმპორტეთ მოდული თქვენს პროექტში
        </p>
        <CodeWindow code={importCodeJS} />
      </section>

      <section id="setup">
        <div className="flex items-center gap-2 mb-6">
          <span className="px-2 py-1 rounded bg-emerald-500/10 text-emerald-500 text-[10px] font-bold uppercase tracking-widest border border-emerald-500/20">
            Production
          </span>
          <span className="text-slate-600 text-xs font-medium">v1.0.0</span>
        </div>

        <h2 className="text-2xl md:text-3xl font-black text-white mb-5 tracking-tight">
          მოახდინეთ კონფიგურაცია/ინიციალიზაცია
        </h2>

        <p className="text-slate-400 leading-relaxed mb-6">
          მოახდინეთ კონფიგურაცია თქვენი ავთენთიკაციის გასაღების (passkey) და
          საიდუმლო გასაღების (secret_key)-ს გამოყენებით;{" "}
          <b className="text-slate-200">
            (ჯობია წამოიღოთ env-დან უსაფრთხოებისთვის, ორივე კრიტიკული
            კომპონენტია)
          </b>
        </p>

        <div className="mb-10">
          <CodeWindow code={configCode} />
        </div>

        <div className="space-y-6 mb-10">
          <div className="flex flex-col md:flex-row md:items-center gap-3 p-4 rounded-xl bg-slate-900/30 border border-slate-800">
            <div className="flex items-center gap-2 shrink-0">
              <code className="text-emerald-300 bg-emerald-500/10 px-2 py-1 rounded text-sm font-bold">
                passkey
              </code>
              <span className="text-slate-600 text-xs">String</span>
            </div>
            <p className="text-sm text-slate-400">
              თქვენი ავთენთიკაციის გასაღები
            </p>
          </div>

          <div className="flex flex-col md:flex-row md:items-center gap-3 p-4 rounded-xl bg-slate-900/30 border border-slate-800">
            <div className="flex items-center gap-2 shrink-0">
              <code className="text-emerald-300 bg-emerald-500/10 px-2 py-1 rounded text-sm font-bold">
                secretKey
              </code>
              <span className="text-slate-600 text-xs">String</span>
            </div>
            <p className="text-sm text-slate-400">
              ყველაზე კრიტიკული კოდი, გამოიყენება უსაფრთხო სესიებისთვის
            </p>
          </div>
        </div>

        <CodeWindow code={config1} />
      </section>
    </div>
  );
}
