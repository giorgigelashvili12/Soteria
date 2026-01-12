export default function Intro() {
  return (
    <div>
      <h1 className="text-5xl font-black text-white mb-8 tracking-tight">
        შესავალი
      </h1>
      <p className="text-xl text-slate-400 leading-relaxed mb-6">
        პატარა მოდული განკუთვნილია იმ მინიმალური საკითხებისთვის, რომელიც
        დაგეხემარებათ დაადასტუროთ პროდუქტები ან სერვისები საიტზე, რათა მოახდინოთ
        გადახდები, მიყიდოთ პროდუქტი მომხმარებელს.
      </p>

      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl mt-10">
        <h3 className="text-emerald-400 font-bold mb-2">ყურადღება</h3>
        <p className="text-slate-400 text-sm">
          სანამ მუშაობას დაიწყებთ, დარწმუნდით რომ გაქვთ წვდომა Dashboard-ზე და
          ფლობთ ექაუნთს.
        </p>
      </div>
    </div>
  );
}
