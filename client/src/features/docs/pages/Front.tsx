import { frontModule, frontSnippet, showcase1 } from "../assets/codes";
import CodeWindow from "../assets/CodeWindow";
import img from "../../src/assets/images/showcase.png";

export default function Front() {
  return (
    <div>
      <div>
        <h2 className="text-2xl font-bold">Frontend ინტეგრაცია</h2>
        <p className="mt-5">
          სერვერის ენდფოინთთან ერთად საჭიროა frontend-ის მხარეშიც პატარა ლოგიკის
          ინტეგრაცია.
        </p>
        <p className="mt-5">
          რადგანაც თქვენ სერვერზე არსებობს გადახდის ენდფოინთი, მასზე უნდა
          გადავაბათ მარტივი ლოგიკა, რომელიც ამასთანავე აგზავნის მოთხოვნას და
          სალაროში ახდენს რედირექციას:
        </p>

        <CodeWindow code={frontModule} fileName="file.jsx / file.tsx" />

        <h2 className="text-2xl font-bold w-100 mt-15">
          რედირექციის მეთოდი - redirectToCheckout(clientSecret);
        </h2>
        <p className="mt-5">
          რაც საჭიროა, არის გადააწოდოთ clientSecret რაც დააბრუნა თქვენმა
          სერვერმა. ამ ფუნქციის გამოყენებით ხდება რედირექცია ვირტუალურ სალაროში.
        </p>
        <CodeWindow code={frontSnippet} fileName="file.jsx / file.tsx" />

        <h2 className="text-xl font-bold w-100 mt-15">
          ფუნქციის გამოყენება რაღაც კონკრეტულ კომპონენტში
        </h2>
        <CodeWindow code={showcase1} fileName="file.jsx / file.tsx" />

        <div className="mt-12 rounded-3xl border border-slate-800 bg-slate-900/30 p-2 overflow-hidden shadow-2xl">
          <div className="aspect-video bg-slate-800 flex items-center justify-center text-slate-600 italic">
            <img src={img} />
          </div>
        </div>
      </div>
    </div>
  );
}
