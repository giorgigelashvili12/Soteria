import { Link } from "react-router-dom";
import CodeWindow from "../assets/CodeWindow";
import { checkoutCode } from "../assets/codes";
import {
  createCheckout,
  getCheckoutUrl,
  syncCatalog,
  deprecated2,
} from "../assets/codes";

export default function Products() {
  return (
    <div className="space-y-20">
      <section id="test-mode">
        <div className="flex items-center gap-2 mb-4">
          <span className="px-2 py-1 rounded bg-yellow-500/10 text-yellow-500 text-[10px] font-bold uppercase tracking-widest">
            Test Mode
          </span>
          <span className="text-slate-600 text-xs">v1.0.0</span>
        </div>
        <h2 className="text-2xl font-bold mb-5">
          პროდუქტების დამატება სიაში (Product Catalog)
        </h2>

        <p>
          რათა დაამატოთ პროდუქტი მოცემულ სიაში, უნდა გადახვიდეთ კონკრეტულ{" "}
          <Link to="/dashboard/product-catalog">მისამართზე</Link> ან გამოიყენოთ
          მენიუ (Sidebar).
        </p>
        <div className="mt-5 rounded-3xl border border-slate-800 bg-slate-900/30 p-2 overflow-hidden shadow-2xl">
          <div className="aspect-video bg-slate-800 flex items-center justify-center text-slate-600 italic">
            <img src="src/assets/images/catalog.png" />
          </div>
        </div>
        {/*         */}
        <p className="mt-5">
          როდესაც გადახვალთ მისამართზე, გამოჩნდება ქვემოთ ნაჩვენები გვერდი
        </p>
        <div className="mt-5 rounded-3xl border border-slate-800 bg-slate-900/30 p-2 overflow-hidden shadow-2xl">
          <div className="aspect-video bg-slate-800 flex items-center justify-center text-slate-600 italic">
            <img src="src/assets/images/dedicated-page.png" />
          </div>
        </div>
        {/*         */}
        <p className="mt-5">
          აქ არის თქვენი დამატებული პროდუქტების ჩამონათვალი. შეგიძლიათ დააჭიროთ
          '+ Add Product' ღილაკს, რომლითაც შეგეძლებათ ახალი პროდუქტის დამატება.
        </p>
        <div className="mt-5 rounded-3xl border border-slate-800 bg-slate-900/30 p-2 overflow-hidden shadow-2xl">
          <div className="aspect-video bg-slate-800 flex items-center justify-center text-slate-600 italic">
            <img src="src/assets/images/create-product.png" />
          </div>
        </div>
        {/*         */}
        <p className="mt-5">
          სამ წერტილზე დაკლიკებით, შეგეძლებათ დააკოპიროთ პროდუქტის SKU,
          პლატფორმის მიერ მინიჭებული ID, ან წაშალოთ არჩეული პროდუქტი.
        </p>
        <div className="mt-5 rounded-3xl border border-slate-800 bg-slate-900/30 p-2 overflow-hidden shadow-2xl">
          <div className="aspect-video bg-slate-800 flex items-center justify-center text-slate-600 italic">
            <img src="src/assets/images/properties.png" />
          </div>
        </div>
      </section>

      <section id="checkout-logic">
        <div className="flex items-center gap-2 mb-4">
          <span className="px-2 py-1 rounded bg-emerald-500/10 text-emerald-500 text-[10px] font-bold uppercase tracking-widest">
            Production
          </span>
          <span className="text-slate-600 text-xs">v1.0.0</span>
        </div>

        <h2 className="text-2xl font-bold mb-5">
          ვირტუალური სალაროს შექმენა (Checkout Session)
        </h2>

        <p>
          ეს მეთოდი იძლევა საშუალებას შეიქმნას გადახდის სესიის ინიციალიზაცია.
          უზრუნველყოფს პროდუქტების (ან პროდუქტის) დალუქვა HMAC "ხელმოწერის"
          გამოყენებით.{" "}
          <Link to="" className="text-emerald-400 hover:underline font-medium">
            განიხილეთ ეს საკითხი
          </Link>
        </p>

        <CodeWindow code={checkoutCode} fileName="routes/checkout.js" />

        <h2 className="text-2xl font-bold mb-5 mt-15">კონკრეტული მეთოდი</h2>
        <CodeWindow code={createCheckout} fileName="routes/checkout.js" />
        <p className="mr-10 mt-10">
          <span className="mb-5 flex items-center gap-3">
            <div className="w-30 bg-slate-900 p-1 rounded-md">
              <code className="text-emerald-300 bg-emerald-500/5 px-1 rounded">
                clientSecret
              </code>
            </div>
            -{" "}
            <code className="text-emerald-300 bg-emerald-500/5 px-1 rounded mt-1">
              (Type - String);
            </code>
            გასაღები, რომელსაც ეს მეთოდი იძლევა
          </span>

          <span className="mb-5 flex items-center gap-3">
            <div className="w-18 bg-slate-900 p-1 rounded-md">
              <code className="text-emerald-300 bg-emerald-500/5 px-1 rounded">
                amount
              </code>
            </div>
            -{" "}
            <code className="text-emerald-300 bg-emerald-500/5 px-1 rounded mt-1">
              (Type - Number);
            </code>
            კონკრეტული პროდუქტის ფასი (თეთრებში)
          </span>

          <span className="mb-5 flex items-center gap-3">
            <div className="w-18 bg-slate-900 p-1 rounded-md">
              <code className="text-emerald-300 bg-emerald-500/5 px-1 rounded">
                cart
              </code>
            </div>
            -{" "}
            <code className="text-emerald-300 bg-emerald-500/5 px-2 rounded mt-1 w-50">
              (Type - Array);
            </code>
            პროდუქტების სია (ერთზეც მორგებულია, მთავარია იყოს მოთავსებული სიაში)
          </span>

          <span className="mb-5 flex items-center gap-3">
            <div className="w-25 bg-slate-900 p-1 rounded-md">
              <code className="text-emerald-300 bg-emerald-500/5 px-1 rounded">
                cart - id
              </code>
            </div>
            -{" "}
            <code className="text-emerald-300 bg-emerald-500/5 px-2 rounded mt-1 w-50">
              (Type - String);
            </code>
            არსებული პროდუქტის ID (Optional)
          </span>

          <span className="mb-5 flex items-center gap-3">
            <div className="w-30 bg-slate-900 p-1 rounded-md">
              <code className="text-emerald-300 bg-emerald-500/5 px-1 rounded w-5">
                cart - name
              </code>
            </div>
            -{" "}
            <code className="text-emerald-300 bg-emerald-500/5 px-2 rounded mt-1 w-50">
              (Type - String);
            </code>
            <p className="w-100">
              მოთხოვნადი, თუ პროდუქტის ID არ არის მითითებული
            </p>
          </span>

          <span className="mb-5 flex items-center gap-3">
            <div className="w-35 bg-slate-900 p-1 rounded-md">
              <code className="text-emerald-300 bg-emerald-500/5 px-1 rounded w-5">
                cart - price
              </code>
            </div>
            -{" "}
            <code className="text-emerald-300 bg-emerald-500/5 px-2 rounded mt-1 w-50">
              (Type - Number);
            </code>
            <p className="w-100">
              მოთხოვნადი, თუ პროდუქტის ID არ არის მითითებული (თეთრებში)
            </p>
          </span>
          <span className="mb-5 flex items-center gap-3">
            <div className="w-35 bg-slate-900 p-1 rounded-md">
              <code className="text-emerald-300 bg-emerald-500/5 px-1 rounded w-50">
                cart - quantity
              </code>
            </div>
            -{" "}
            <code className="text-emerald-300 bg-emerald-500/5 px-2 rounded mt-1 w-40">
              (Type - Number);
            </code>
            <p className="w-80">საჭირო, პროდუქტის რაოდენობის მაჩვენებელი</p>
          </span>
        </p>

        <h2 className="text-2xl font-bold mb-5 mt-15"> getCheckoutUrl() </h2>
        <p>
          თქვენი{" "}
          <code className="text-emerald-300 bg-emerald-500/5 px-1 rounded">
            clientSecret
          </code>
          -ის გამოყენებით აბრუნებს სალაროს მისამართს
        </p>
        <CodeWindow code={getCheckoutUrl} fileName="routes/checkout.js" />
        <p className="mr-10 mt-10">
          <span className="mb-5 flex items-center gap-3">
            <div className="w-30 bg-slate-900 p-1 rounded-md">
              <code className="text-emerald-300 bg-emerald-500/5 px-1 rounded">
                clientSecret
              </code>
            </div>
            -{" "}
            <code className="text-emerald-300 bg-emerald-500/5 px-1 rounded mt-1">
              (Type - String);
            </code>
            გასაღები, რომელსაც ეს მეთოდი იძლევა
          </span>
        </p>
      </section>

      <section id="methods" className="mt-10">
        <div className="flex items-center gap-2 mb-4">
          <span className="px-2 py-1 rounded bg-emerald-500/10 text-emerald-500 text-[10px] font-bold uppercase tracking-widest">
            Production
          </span>
          <span className="text-slate-600 text-xs">v1.0.0</span>
        </div>

        <h2 className="text-2xl font-bold">
          პროდუქტების სინქრონიზაცია - syncCatalog()
        </h2>
        <p className="mt-5">
          ეს ფუნქცია იდეალურია, თუ თქვენი პლატფორმა მოიცავს პროდუქტების დიდ
          ბაზას და რაოდენობას, ეს მეთოდი პრაქტიკულია. გიწევთ ერთადერთ პარამეტრად
          გადააწოდოთ ყველა პროდუქტის სია (MongoDB-დან წამოღებული JSON-ად
          გარდაქმნილი ან პირდაპირ JSON სია);
        </p>
        <CodeWindow code={syncCatalog} fileName="file.js" />

        <span className="my-5 flex items-center gap-3">
          <div className="w-30 bg-slate-900 p-1 rounded-md">
            <code className="text-emerald-300 bg-emerald-500/5 px-1 rounded w-5">
              products
            </code>
          </div>
          -{" "}
          <code className="text-emerald-300 bg-emerald-500/5 px-2 rounded mt-1 w-50">
            (Type - Array);
          </code>
          <p className="w-100">პროდუქტის დოკუმეტების სია ან კოლეცია</p>
        </span>

        <span className="my-5 flex items-center gap-3">
          <div className="w-35 bg-slate-900 p-1 rounded-md">
            <code className="text-emerald-300 bg-emerald-500/5 px-1 rounded w-5">
              products - id
            </code>
          </div>
          -{" "}
          <code className="text-emerald-300 bg-emerald-500/5 px-2 rounded mt-1 w-50">
            (Type - String);
          </code>
          <p className="w-100">SKU ან პროდუქტის ID</p>
        </span>

        <span className="my-5 flex items-center gap-3">
          <div className="w-40 bg-slate-900 p-1 rounded-md">
            <code className="text-emerald-300 bg-emerald-500/5 px-1 rounded w-5">
              products - name
            </code>
          </div>
          -{" "}
          <code className="text-emerald-300 bg-emerald-500/5 px-2 rounded mt-1 w-50">
            (Type - String);
          </code>
          <p className="w-100">პროდუქტის სახელი</p>
        </span>

        <span className="my-5 flex items-center gap-3">
          <div className="w-45 bg-slate-900 p-1 rounded-md">
            <code className="text-emerald-300 bg-emerald-500/5 px-1 rounded w-5">
              products - price
            </code>
          </div>
          -{" "}
          <code className="text-emerald-300 bg-emerald-500/5 px-2 rounded mt-1 w-50">
            (Type - Number);
          </code>
          <p className="w-100">პროდუქტის ფასი (თეთრებში)</p>
        </span>

        <span className="my-5 flex items-center gap-3">
          <div className="w-65 bg-slate-900 p-1 rounded-md">
            <code className="text-emerald-300 bg-emerald-500/5 px-1 rounded w-5">
              products - description
            </code>
          </div>
          -{" "}
          <code className="text-emerald-300 bg-emerald-500/5 px-2 rounded mt-1 w-50">
            (Type - Number);
          </code>
          <p className="w-100">პროდუქტის დახასიათება (არ არის მოთხოვნადი)</p>
        </span>
      </section>

      <section id="old">
        <div className="flex items-center gap-2 mb-4">
          <span className="px-2 py-1 rounded bg-rose-500/10 text-rose-500 text-[10px] font-bold uppercase tracking-widest">
            Deprecated
          </span>
        </div>

        <h2 className="mt-10 font-bold text-2xl text-rose-200 mb-5">
          createIntent(config)
        </h2>
        <p>
          არ არის სასურველი გამოყენებისთვის, მიმართეთ უფრო უსაფრთხო და
          განახლებულ ალტერნატივას:{" "}
          <code className="text-emerald-300 bg-emerald-500/5 px-1 rounded w-5">
            await soteria.createCheckout(cart);
          </code>
        </p>
        <p className="mt-5">
          აგზავნის პროდუქტებს პირდაპირ მონაცემის ბაზაში. არ იყენებს არანაირ
          უსაფრთხოებას და აქიდან გამომდინარე ქმნის გამონაკლის შემთხვევას სადაც
          შესაძლებელია პროდუქტის მონაცემების შეცვლა. არ იყენებს არანაირ
          ვალიდაციას
        </p>
        <CodeWindow code={deprecated2} fileName="file.js" />
      </section>

      <section id="delete">
        <h2 className="text-2xl font-bold">წაშლა და განახლება</h2>
      </section>
    </div>
  );
}
