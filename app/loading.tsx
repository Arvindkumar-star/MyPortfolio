export default function Loading() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-24 space-y-16 animate-pulse">
      {/* Hero skeleton */}
      <div className="flex flex-col items-center text-center space-y-4">
        <div className="h-6 w-48 rounded-full bg-slate-200 dark:bg-slate-800" />
        <div className="h-12 w-3/4 max-w-xl rounded-2xl bg-slate-200 dark:bg-slate-800" />
        <div className="h-4 w-1/2 max-w-md rounded-lg bg-slate-200 dark:bg-slate-800" />
        <div className="flex gap-3 pt-4">
          <div className="h-11 w-36 rounded-xl bg-slate-200 dark:bg-slate-800" />
          <div className="h-11 w-36 rounded-xl bg-slate-200 dark:bg-slate-800" />
        </div>
      </div>

      {/* Projects skeleton */}
      <div className="space-y-6">
        <div className="h-8 w-40 rounded-xl bg-slate-200 dark:bg-slate-800" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-56 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5" />
          ))}
        </div>
      </div>
    </div>
  );
}
