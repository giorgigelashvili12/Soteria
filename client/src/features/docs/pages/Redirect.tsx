import img1 from "../../../assets/images/complete-setup.png";
import img2 from "../../../assets/images/finish-connection.png";
import img3 from "../../../assets/images/failed.png";
import img4 from "../../../assets/images/success.png";
import { Link } from "react-router-dom";

export default function Redirect() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 md:py-12">
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-4">
          <span className="px-2 py-1 rounded bg-emerald-500/10 text-emerald-500 text-[10px] font-bold uppercase tracking-widest border border-emerald-500/20">
            Setup Guide
          </span>
        </div>
        <h1 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tight">
          რედირექციის ლინკები
        </h1>
        <p className="text-base md:text-lg text-slate-400 max-w-2xl leading-relaxed">
          როცა მომხმარებელი გადავა სალაროში, უნდა გაკეთდეს რედირექცია,
          დადასტურდა თუ არა ტრანზაქცია. გადადით ამ ლინკზე რომელიც dashboard
          გვერდზეა
        </p>
      </div>

      <div className="space-y-8 md:space-y-12">
        <div className="group relative p-4 md:p-8 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-emerald-500/30 transition-all">
          <div className="flex flex-col md:flex-row gap-4">
            <div>
              <h3 className="text-white text-lg font-bold mb-2">გადასვლა</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                დაინახავთ Header-ში
              </p>
            </div>
          </div>

          <div className="mt-8 md:mt-12 rounded-xl md:rounded-3xl border border-slate-800 bg-slate-900/30 p-1 md:p-2 overflow-hidden shadow-2xl">
            <div className="aspect-video bg-slate-800 flex items-center justify-center overflow-hidden">
              <img src={img1} alt="Login guide" className="w-250 h-75" />
            </div>
          </div>
        </div>

        <div className="group relative p-4 md:p-8 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-emerald-500/30 transition-all">
          <div className="flex flex-col md:flex-row gap-4">
            <div>
              <h3 className="text-white text-lg font-bold mb-2">
                Finish Connection გვერდი
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                დაინახავთ ამ შესავსებ ველებს: პირველში შეიტანეთ თქვენი ვებსაიტის
                მისამართი, რომელიც მომხმარებელს გადაიყვანს კონკრეტულ მისამართზე,
                რომელიც მიუთითებს რომ გადახდა წარმატებით განხორციელდა, მეორე
                ველში კი საპირისპირო - ვერ მოხერხდა. თუ თქვენ პლატფორმას არ
                გააჩნია ეს ლინკები ან არ მიუთითებთ, მაშინ ჩვენ გამოვიყენებთ
                ყვენისადმი შექმნილ გვერდებს.
              </p>
            </div>
          </div>
          <div className="mt-8 md:mt-12 rounded-xl md:rounded-3xl border border-slate-800 bg-slate-900/30 p-1 md:p-2 overflow-hidden shadow-2xl">
            <div className="aspect-video bg-slate-800 flex items-center justify-center overflow-hidden">
              <img
                src={img2}
                alt="Workspace guide"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        <div className="group relative p-4 md:p-8 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-emerald-500/30 transition-all">
          <div className="flex flex-col md:flex-row gap-4">
            <div>
              <h3 className="text-white text-lg font-bold mb-2">
                ჩვენი გვერდის თვალსაჩინოება როდესაც გადახდა ვერ განხორციელდა
              </h3>
            </div>
          </div>
          <div className="mt-8 md:mt-12 rounded-xl md:rounded-3xl border border-slate-800 bg-slate-900/30 p-1 md:p-2 overflow-hidden shadow-2xl">
            <div className="aspect-video bg-slate-800 flex items-center justify-center overflow-hidden">
              <img
                src={img3}
                alt="Account settings"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        <div className="group relative p-4 md:p-8 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-emerald-500/30 transition-all">
          <div className="flex flex-col md:flex-row gap-4">
            <div>
              <h3 className="text-white text-lg font-bold mb-2">
                ჩვენი გვერდის თვალსაჩინოება როდესაც გადახდამ წარმატებით ჩაიარა
              </h3>
            </div>
          </div>
          <div className="mt-8 md:mt-12 rounded-xl md:rounded-3xl border border-slate-800 bg-slate-900/30 p-1 md:p-2 overflow-hidden shadow-2xl">
            <div className="aspect-video bg-slate-800 flex items-center justify-center overflow-hidden">
              <img
                src={img4}
                alt="Account settings"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
