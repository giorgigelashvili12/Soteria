import { frontModule, frontSnippet, showcase1 } from "../assets/codes";
import CodeWindow from "../assets/CodeWindow";
import img from "../../../assets/images/showcase.png";

export default function Front() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 md:py-12 text-slate-300">
      <div>
        <h2 className="text-2xl md:text-3xl font-black text-white mb-6 tracking-tight">
          Frontend ინტეგრაცია
        </h2>

        <div className="space-y-5 text-slate-400 leading-relaxed">
          <p>
            სერვერის ენდფოინთთან ერთად საჭიროა frontend-ის მხარეშიც პატარა
            ლოგიკის ინტეგრაცია.
          </p>
          <p>
            რადგანაც თქვენ სერვერზე არსებობს გადახდის ენდფოინთი, მასზე უნდა
            გადავაბათ მარტივი ლოგიკა, რომელიც ამასთანავე აგზავნის მოთხოვნას და
            სალაროში ახდენს რედირექციას:
          </p>
        </div>

        <div className="mt-8 mb-16">
          <CodeWindow code={frontModule} fileName="file.jsx / file.tsx" />
        </div>

        <h2 className="text-xl md:text-2xl font-bold text-white mt-12 mb-5 leading-snug">
          რედირექციის მეთოდი -{" "}
          <code className="text-emerald-400">
            redirectToCheckout(clientSecret)
          </code>
        </h2>

        <p className="text-slate-400 leading-relaxed mb-6">
          რაც საჭიროა, არის გადააწოდოთ{" "}
          <code className="text-emerald-300 bg-emerald-500/10 px-1 rounded">
            clientSecret
          </code>{" "}
          რაც დააბრუნა თქვენმა სერვერმა. ამ ფუნქციის გამოყენებით ხდება
          რედირექცია ვირტუალურ სალაროში.
        </p>

        <div className="mb-16">
          <CodeWindow code={frontSnippet} fileName="file.jsx / file.tsx" />
        </div>

        <h2 className="text-xl md:text-2xl font-bold text-white mt-12 mb-5">
          ფუნქციის გამოყენება კონკრეტულ კომპონენტში
        </h2>

        <div className="mb-12">
          <CodeWindow code={showcase1} fileName="file.jsx / file.tsx" />
        </div>

        <div className="mt-12 rounded-2xl md:rounded-3xl border border-slate-800 bg-slate-900/30 p-1 md:p-2 overflow-hidden shadow-2xl">
          <div className="aspect-video bg-slate-800 flex items-center justify-center overflow-hidden">
            <img
              src={img}
              alt="Integration Showcase"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
