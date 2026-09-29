"use client";

import { useEffect } from "react";
import { AlertCircle, RefreshCw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global app error caught:", error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
      <div className="p-3 rounded-2xl bg-red-500/10 text-red-500 mb-4">
        <AlertCircle size={32} />
      </div>
      <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Something went wrong</h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 max-w-md">
        An unexpected error occurred while rendering the page.
      </p>
      <button
        onClick={() => reset()}
        className="mt-6 inline-flex items-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-400 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition-all cursor-pointer"
      >
        <RefreshCw size={16} className="text-white" />
        <span>Try Again</span>
      </button>
    </div>
  );
}
