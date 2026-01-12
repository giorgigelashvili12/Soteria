import CodeWindow from "../assets/CodeWindow";
import { installCode } from "../assets/codes";
import { importCodeJS } from "../assets/codes";
import { configCode, config1 } from "../assets/codes";

export default function Config() {
  return (
    <div>
      <div>
        <section id="logic">
          <div className="flex items-center gap-2 mb-4">
            <span className="px-2 py-1 rounded bg-emerald-500/10 text-emerald-500 text-[10px] font-bold uppercase tracking-widest">
              Production
            </span>
            <span className="text-slate-600 text-xs">v1.1.0</span>
          </div>

          <h2 className="text-2xl font-bold mb-5">მოდულის ინსტალაცია</h2>

          <p>
            გამოიყენეთ ეს კომანდი რათა დააყენოთ მოდული (განახლებულ ვერსიაში არის
            უსაფრთხო გზით მუშაობა დამატებული, ამიტომ crypto მოდული საჭიროა)
          </p>

          <CodeWindow code={installCode} fileName="bash" />
          {/*      */}
          <p className="mt-15">დააიმპორტეთ მოდული თქვენს პროექტში</p>
          <CodeWindow code={importCodeJS} fileName="index.js / .ts" />
          {/*      */}
        </section>
      </div>
      <div className="mt-30">
        <section id="setup">
          <div className="flex items-center gap-2 mb-4">
            <span className="px-2 py-1 rounded bg-emerald-500/10 text-emerald-500 text-[10px] font-bold uppercase tracking-widest">
              Production
            </span>
            <span className="text-slate-600 text-xs">v1.0.0</span>
          </div>

          <h2 className="text-2xl font-bold mb-5">
            მოახდინეთ კონფიგურაცია/ინიციალიზაცია მთავარ ფაილში
          </h2>
          <p className="mt-5">
            მოახდინეთ კონფიგურაცია თქვენი ავთენთიკაციის გასაღების (passkey) და
            საიდუმლო გასაღების (secret_key)-ს გამოყენებით;{" "}
            <b>
              (ჯობია წამოიღოთ env-დან უსაფრთხოებისთვის, ორივე კრიტიკული
              კომპონენტია)
            </b>
          </p>
          <CodeWindow code={configCode} fileName="index.js / index.ts" />

          <p className="mt-5">
            <span className="mb-5 flex items-center gap-3">
              <div className="w-50 bg-slate-900 p-1 rounded-md">
                <code className="text-emerald-300 bg-emerald-500/5 px-1 rounded">
                  passkey
                </code>
              </div>
              -{" "}
              <code className="text-emerald-300 bg-emerald-500/5 px-1 rounded mt-1">
                (Type - String);
              </code>
              თქვენი ავთენთიკაციის გასაღები
            </span>

            <span className="mt-5 flex w-full gap-3 items-center">
              <div className="w-50 bg-slate-900 p-1 rounded-md mt-5">
                <code className="text-emerald-300 bg-emerald-500/5 px-1 rounded mt-1">
                  secretKey
                </code>
              </div>
              -{" "}
              <code className="text-emerald-300 bg-emerald-500/5 px-1 rounded mt-1 w-50">
                (Type - String);
              </code>
              <p className="w-100">
                ყველაზე კრიტიკული კოდი, გამოიყენება უსაფრთხო სესიებისთვის
              </p>
            </span>
          </p>
          <CodeWindow code={config1} fileName="file.js" />
        </section>
      </div>
    </div>
  );
}
