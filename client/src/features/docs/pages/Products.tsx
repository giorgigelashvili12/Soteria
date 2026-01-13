import { Link } from "react-router-dom";
import CodeWindow from "../assets/CodeWindow";
import { checkoutCode } from "../assets/codes";
import {
  createCheckout,
  //getCheckoutUrl,
  syncCatalog,
  deprecated2,
  deleteProduct,
  updateProduct,
  getParamEmpty,
  getParamGiven,
  deleteUsage,
  updateUsage,
  getParamEmptyUsage,
  getParamGivenUsage,
} from "../assets/codes";
import img1 from "../../../assets/images/catalog.png";
import img2 from "../../../assets/images/dedicated-page.png";
import img3 from "../../../assets/images/create-product.png";
import img4 from "../../../assets/images/properties.png";

export default function Products() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 md:py-12 space-y-16 md:space-y-24 text-slate-300">
      <section id="test-mode">
        <div className="flex items-center gap-2 mb-6">
          <span className="px-2 py-1 rounded bg-yellow-500/10 text-yellow-500 text-[10px] font-bold uppercase tracking-widest border border-yellow-500/20">
            Test Mode
          </span>
          <span className="text-slate-600 text-xs">v1.0.0</span>
        </div>

        <h2 className="text-2xl md:text-3xl font-black text-white mb-6 tracking-tight">
          პროდუქტების დამატება (Product Catalog)
        </h2>

        <div className="space-y-6 text-slate-400 leading-relaxed">
          <p>
            რათა დაამატოთ პროდუქტი მოცემულ სიაში, უნდა გადახვიდეთ კონკრეტულ{" "}
            <Link
              to="/dashboard/product-catalog"
              className="text-emerald-400 hover:underline"
            >
              მისამართზე
            </Link>{" "}
            ან გამოიყენოთ მენიუ (Sidebar).
          </p>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/30 p-1 md:p-2 overflow-hidden shadow-2xl">
            <div className="aspect-video bg-slate-800 flex items-center justify-center overflow-hidden">
              <img
                src={img1}
                alt="Catalog sidebar"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <p>
            როდესაც გადახვალთ მისამართზე, გამოჩნდება ქვემოთ ნაჩვენები გვერდი:
          </p>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/30 p-1 md:p-2 overflow-hidden shadow-2xl">
            <div className="aspect-video bg-slate-800 flex items-center justify-center overflow-hidden">
              <img
                src={img2}
                alt="Catalog page"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <p>
            აქ არის თქვენი დამატებული პროდუქტების ჩამონათვალი. შეგიძლიათ
            დააჭიროთ
            <span className="text-emerald-400 font-bold ml-1">
              '+ Add Product'
            </span>{" "}
            ღილაკს.
          </p>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/30 p-1 md:p-2 overflow-hidden shadow-2xl">
            <div className="aspect-video bg-slate-800 flex items-center justify-center overflow-hidden">
              <img
                src={img3}
                alt="Add product"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <p>
            სამ წერტილზე დაკლიკებით, შეგეძლებათ დააკოპიროთ SKU ან წაშალოთ
            პროდუქტი.
          </p>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/30 p-1 md:p-2 overflow-hidden shadow-2xl">
            <div className="aspect-video bg-slate-800 flex items-center justify-center overflow-hidden">
              <img
                src={img4}
                alt="Product properties"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="checkout-logic">
        <div className="flex items-center gap-2 mb-6">
          <span className="px-2 py-1 rounded bg-emerald-500/10 text-emerald-500 text-[10px] font-bold uppercase tracking-widest border border-emerald-500/20">
            Production
          </span>
          <span className="text-slate-600 text-xs">v1.0.0</span>
        </div>

        <h2 className="text-2xl md:text-3xl font-black text-white mb-6 tracking-tight">
          ვირტუალური სალაროს შექმენა (Checkout Session)
        </h2>

        <p className="text-slate-400 leading-relaxed mb-8">
          ეს მეთოდი იძლევა საშუალებას შეიქმნას გადახდის სესიის ინიციალიზაცია.
          უზრუნველყოფს პროდუქტების დალუქვა{" "}
          <code className="text-emerald-400">HMAC</code> "ხელმოწერის"
          გამოყენებით.
        </p>

        <CodeWindow code={checkoutCode} />

        <h3 className="text-xl font-bold text-white mt-12 mb-6">
          კონკრეტული მეთოდი
        </h3>
        <CodeWindow code={createCheckout} />

        <div className="mt-10 space-y-4">
          {[
            {
              label: "clientSecret",
              type: "String",
              desc: "გასაღები, რომელსაც ეს მეთოდი იძლევა",
            },
            {
              label: "amount",
              type: "Number",
              desc: "კონკრეტული პროდუქტის ფასი (თეთრებში)",
            },
            {
              label: "cart",
              type: "Array",
              desc: "პროდუქტების სია (ერთზეც მორგებულია)",
            },
            {
              label: "cart - id",
              type: "String",
              desc: "არსებული პროდუქტის ID (Optional)",
            },
            {
              label: "cart - name",
              type: "String",
              desc: "მოთხოვნადი, თუ პროდუქტის ID არ არის მითითებული",
            },
            {
              label: "cart - price",
              type: "Number",
              desc: "მოთხოვნადი, თუ პროდუქტის ID არ არის მითითებული (თეთრებში)",
            },
            {
              label: "cart - quantity",
              type: "Number",
              desc: "საჭირო, პროდუქტის რაოდენობის მაჩვენებელი",
            },
          ].map((param, i) => (
            <div
              key={i}
              className="flex flex-col md:flex-row md:items-center gap-3 p-3 rounded-lg bg-slate-900/50 border border-slate-800"
            >
              <div className="flex items-center gap-2 shrink-0 min-w-[140px]">
                <code className="text-emerald-400 text-sm font-bold">
                  {param.label}
                </code>
              </div>
              <div className="hidden md:block text-slate-600">-</div>
              <code className="text-[10px] text-slate-500 uppercase font-bold tracking-tighter">
                ({param.type})
              </code>
              <p className="text-sm text-slate-400">{param.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="methods">
        <div className="flex items-center gap-2 mb-6">
          <span className="px-2 py-1 rounded bg-emerald-500/10 text-emerald-500 text-[10px] font-bold uppercase tracking-widest border border-emerald-500/20">
            Production
          </span>
          <span className="text-slate-600 text-xs">v1.0.0</span>
        </div>

        <h2 className="text-2xl md:text-3xl font-black text-white mb-6 tracking-tight">
          პროდუქტების სინქრონიზაცია -{" "}
          <code className="text-emerald-400">syncCatalog()</code>
        </h2>

        <p className="text-slate-400 leading-relaxed mb-8">
          ეს ფუნქცია იდეალურია, თუ თქვენი პლატფორმა მოიცავს პროდუქტების დიდ
          ბაზას. გადააწოდეთ ყველა პროდუქტის სია JSON ფორმატში.
        </p>

        <CodeWindow code={syncCatalog} />

        <div className="mt-8 space-y-3">
          <div className="p-4 rounded-xl bg-slate-900/30 border border-slate-800 text-sm text-slate-400">
            გადააწოდეთ პროდუქტების მასივი, სადაც თითოეული ობიექტი შეიცავს:
            <code className="text-emerald-400 ml-1">id</code>,
            <code className="text-emerald-400 ml-1">name</code>,
            <code className="text-emerald-400 ml-1">price</code>.
          </div>
        </div>
      </section>

      <section id="delete" className="pt-10 border-t border-slate-800">
        <div className="flex items-center gap-2 mb-6">
          <span className="px-2 py-1 rounded bg-emerald-500/10 text-emerald-500 text-[10px] font-bold uppercase tracking-widest border border-emerald-500/20">
            Production
          </span>
          <span className="text-slate-600 text-xs">v1.2.0</span>
        </div>
        <h2 className="text-3xl font-bold text-white">დამატებითი ფუნქციები</h2>
        <div>
          <h2 className="text-2xl font-bold text-white mt-5">
            1. პროდუქტის წაშლა
          </h2>
          <p className="text-slate-500 mt-2">
            იძლევა შესაძლებლობას წაიშალოს ერთი კონკრეტული პროდუქტი მისი
            იდენთიფიქატორის (ID) გამოყენებით.
          </p>
          <CodeWindow code={deleteProduct} />
          <div className=" mt-5 flex flex-col md:flex-row md:items-center gap-3 p-3 rounded-lg bg-slate-900/50 border border-slate-800">
            <div className="flex items-center gap-2 shrink-0 min-w-35">
              <code className="text-emerald-400 text-sm font-bold">
                productId
              </code>
            </div>
            <div className="hidden md:block text-slate-600">-</div>
            <code className="text-[10px] text-slate-500 uppercase font-bold tracking-tighter">
              (String)
            </code>
            <p className="text-sm text-slate-400">არსებული პროდუქტის ID</p>
          </div>

          <h2 className="text-xl font-bold mt-10">გამოყენება</h2>
          <CodeWindow code={deleteUsage} />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-white mt-20">
            2. პროდუქტის ობიექტის განახლება
          </h2>
          <p className="text-slate-500 mt-2">
            შესაძლებელია შეიცვალოს არსებული პროდუქტის მონაცემი ან მონაცემები
            (საჭიროა ან ID, ან SKU, უმჯობესია ID გამოიყენოთ)
          </p>
          <CodeWindow code={updateProduct} />
          <div className=" mt-5 flex flex-col md:flex-row md:items-center gap-3 p-3 rounded-lg bg-slate-900/50 border border-slate-800">
            <div className="flex items-center gap-2 shrink-0 min-w-35">
              <code className="text-emerald-400 text-sm font-bold">id</code>
            </div>
            <div className="hidden md:block text-slate-600">-</div>
            <code className="text-[10px] text-slate-500 uppercase font-bold tracking-tighter">
              (String)
            </code>
            <p className="text-sm text-slate-400">არსებული პროდუქტის ID</p>
          </div>
          <div className=" mt-5 flex flex-col md:flex-row md:items-center gap-3 p-3 rounded-lg bg-slate-900/50 border border-slate-800">
            <div className="flex items-center gap-2 shrink-0 min-w-35">
              <code className="text-emerald-400 text-sm font-bold">name</code>
            </div>
            <div className="hidden md:block text-slate-600">-</div>
            <code className="text-[10px] text-slate-500 uppercase font-bold tracking-tighter">
              (String)
            </code>
            <p className="text-sm text-slate-400">არსებული პროდუქტის სახელი</p>
          </div>
          <div className=" mt-5 flex flex-col md:flex-row md:items-center gap-3 p-3 rounded-lg bg-slate-900/50 border border-slate-800">
            <div className="flex items-center gap-2 shrink-0 min-w-35">
              <code className="text-emerald-400 text-sm font-bold">price</code>
            </div>
            <div className="hidden md:block text-slate-600">-</div>
            <code className="text-[10px] text-slate-500 uppercase font-bold tracking-tighter">
              (Number)
            </code>
            <p className="text-sm text-slate-400">არსებული პროდუქტის ფასი</p>
          </div>
          <div className=" mt-5 flex flex-col md:flex-row md:items-center gap-3 p-3 rounded-lg bg-slate-900/50 border border-slate-800">
            <div className="flex items-center gap-2 shrink-0 min-w-35">
              <code className="text-emerald-400 text-sm font-bold">
                currency
              </code>
            </div>
            <div className="hidden md:block text-slate-600">-</div>
            <code className="text-[10px] text-slate-500 uppercase font-bold tracking-tighter">
              (String)
            </code>
            <p className="text-sm text-slate-400">
              არსებული პროდუქტის მითითებული ვალუტა
            </p>
          </div>
          <div className=" mt-5 flex flex-col md:flex-row md:items-center gap-3 p-3 rounded-lg bg-slate-900/50 border border-slate-800">
            <div className="flex items-center gap-2 shrink-0 min-w-35">
              <code className="text-emerald-400 text-sm font-bold">sku</code>
            </div>
            <div className="hidden md:block text-slate-600">-</div>
            <code className="text-[10px] text-slate-500 uppercase font-bold tracking-tighter">
              (String)
            </code>
            <p className="text-sm text-slate-400">არსებული პროდუქტის SKU</p>
          </div>
          <div className=" mt-5 flex flex-col md:flex-row md:items-center gap-3 p-3 rounded-lg bg-slate-900/50 border border-slate-800">
            <div className="flex items-center gap-2 shrink-0 min-w-35">
              <code className="text-emerald-400 text-sm font-bold">
                description
              </code>
            </div>
            <div className="hidden md:block text-slate-600">-</div>
            <code className="text-[10px] text-slate-500 uppercase font-bold tracking-tighter">
              (String)
            </code>
            <p className="text-sm text-slate-400">არსებული პროდუქტის აღწერა</p>
          </div>

          <h2 className="text-xl font-bold mt-10">გამოყენება</h2>
          <CodeWindow code={updateUsage} />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-white mt-20">
            3. ერთი პროდუქტის წამოღება
          </h2>
          <p className="text-slate-500 mt-2">
            იძლევა შესაძლებლობას წამოიღოთ ერთი კონკრეტული პროდუქტი ID-ის
            გამოყენებით
          </p>
          <CodeWindow code={getParamEmpty} />
          <div className=" mt-5 flex flex-col md:flex-row md:items-center gap-3 p-3 rounded-lg bg-slate-900/50 border border-slate-800">
            <div className="flex items-center gap-2 shrink-0 min-w-35">
              <code className="text-emerald-400 text-sm font-bold italic">
                არაფერი
              </code>
            </div>
            <div className="hidden md:block text-slate-600">-</div>
            <code className="text-[10px] text-slate-500 uppercase font-bold tracking-tighter"></code>
            <p className="text-sm text-slate-400">
              თუ არ არის არანაირი არგუმენტი გადაწოდებული, ერორის ნაცვლად მოაქვს
              პირველი პროდუქტი კოლექციაში
            </p>
          </div>

          <p className="mt-10">აქ კი ნებისმიერი რომელიც გინდათ</p>
          <CodeWindow code={getParamGiven} />
          <div className=" mt-5 flex flex-col md:flex-row md:items-center gap-3 p-3 rounded-lg bg-slate-900/50 border border-slate-800">
            <div className="flex items-center gap-2 shrink-0 min-w-35">
              <code className="text-emerald-400 text-sm font-bold italic">
                id
              </code>
            </div>
            <div className="hidden md:block text-slate-600">-</div>
            <code className="text-[10px] text-slate-500 uppercase font-bold tracking-tighter">
              (String)
            </code>
            <p className="text-sm text-slate-400">არსებული პროდუქტის ID</p>
          </div>

          <h2 className="text-xl font-bold mt-10">გამოყენება (უარგუმენტო)</h2>
          <CodeWindow code={getParamEmptyUsage} />
          <h2 className="text-xl font-bold mt-10">გამოყენება (არგუმენტით)</h2>
          <CodeWindow code={getParamGivenUsage} />
        </div>
      </section>

      <section
        id="old"
        className="p-6 rounded-2xl border border-rose-500/20 bg-rose-500/5"
      >
        <div className="flex items-center gap-2 mb-4">
          <span className="px-2 py-1 rounded bg-rose-500/10 text-rose-500 text-[10px] font-bold uppercase tracking-widest">
            Deprecated
          </span>
        </div>

        <h2 className="text-xl md:text-2xl font-bold text-rose-200 mb-4">
          createIntent(config)
        </h2>

        <p className="text-sm text-slate-400 mb-6">
          არ არის სასურველი გამოყენებისთვის. მიმართეთ უსაფრთხო ალტერნატივას:
          <code className="block mt-2 text-emerald-400 bg-slate-950 p-2 rounded">
            await soteria.createCheckout(cart);
          </code>
        </p>

        <CodeWindow code={deprecated2} />
      </section>
    </div>
  );
}
