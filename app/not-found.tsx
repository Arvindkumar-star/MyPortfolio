import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
      <h1 className="text-6xl font-bold font-mono text-indigo-600 dark:text-indigo-400">404</h1>
      <h2 className="mt-4 text-2xl font-bold text-slate-900 dark:text-white">Page Not Found</h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 max-w-md">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/"
        className="mt-6 inline-flex items-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-400 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition-all"
      >
        <ArrowLeft size={16} className="text-white" />
        <span>Return to Portfolio</span>
      </Link>
    </div>
  );
}
