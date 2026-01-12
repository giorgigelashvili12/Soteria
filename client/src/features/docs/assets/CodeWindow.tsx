import { useState } from "react";

const CodeWindow = ({
  code,
  fileName = "server.js",
}: {
  code: string;
  fileName?: string;
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group mt-6 md:mt-8">
      <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>

      <div className="relative bg-[#0d1117] rounded-xl overflow-hidden border border-slate-800 shadow-2xl">
        <div className="flex items-center justify-between px-3 md:px-4 py-3 bg-[#161b22] border-b border-slate-800">
          <div className="flex items-center gap-2 md:gap-4 overflow-hidden">
            <div className="hidden sm:flex gap-1.5 shrink-0">
              <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
              <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
              <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
            </div>

            <div className="flex items-center gap-2 bg-[#0d1117] px-3 py-1.5 rounded-t-lg border-t border-x border-slate-800 -mb-3.5 sm:ml-2 overflow-hidden">
              <span className="text-emerald-400 shrink-0">
                <svg
                  className="w-3.5 h-3.5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2L4 5v11l8 3 8-3V5l-8-3zm0 14.5L7 14.7V6.3l5-1.8 5 1.8v8.4l-5 1.8z" />
                </svg>
              </span>
              <span className="text-[10px] md:text-xs text-slate-300 font-mono tracking-tight truncate max-w-[120px] md:max-w-none">
                {fileName}
              </span>
            </div>
          </div>

          <button
            onClick={handleCopy}
            className={`shrink-0 text-[10px] font-bold uppercase tracking-widest transition-colors px-2 py-1 rounded ${
              copied
                ? "text-emerald-400"
                : "text-slate-500 hover:text-emerald-400"
            }`}
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>

        <div className="relative">
          <pre className="p-4 md:p-6 text-xs md:text-sm font-mono leading-relaxed overflow-x-auto scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent">
            <code className="grid">
              {code
                .trim()
                .split("\n")
                .map((line, i) => (
                  <div
                    key={i}
                    className="flex hover:bg-emerald-500/5 transition-colors group/line"
                  >
                    <span className="inline-block text-right pr-4 text-slate-600 select-none w-10 shrink-0">
                      {i + 1}
                    </span>
                    <span className="text-emerald-300/90 whitespace-pre">
                      {line || " "}
                    </span>
                  </div>
                ))}
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
};

export default CodeWindow;
