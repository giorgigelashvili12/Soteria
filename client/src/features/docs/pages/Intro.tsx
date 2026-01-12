export default function Intro() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 md:py-12">
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 md:mb-8 tracking-tight">
        შესავალი
      </h1>

      <p className="text-lg md:text-xl text-slate-400 leading-relaxed mb-8 md:mb-10">
        პატარა მოდული განკუთვნილია იმ მინიმალური საკითხებისთვის, რომელიც
        დაგეხემარებათ დაადასტუროთ პროდუქტები ან სერვისები საიტზე, რათა მოახდინოთ
        გადახდები, მიყიდოთ პროდუქტი მომხმარებელს.
      </p>

      <div className="p-5 md:p-8 rounded-2xl bg-slate-900/50 border border-slate-800 shadow-2xl mt-10 backdrop-blur-sm">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
          <h3 className="text-emerald-400 font-bold uppercase tracking-wider text-sm">
            ყურადღება
          </h3>
        </div>
        <p className="text-slate-400 text-sm md:text-base leading-relaxed">
          სანამ მუშაობას დაიწყებთ, დარწმუნდით რომ გაქვთ წვდომა Dashboard-ზე და
          ფლობთ ექაუნთს.
        </p>
      </div>
    </div>
  );
}
