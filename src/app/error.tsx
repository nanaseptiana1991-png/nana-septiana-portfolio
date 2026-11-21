"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-obsidian p-8 font-sans text-white">
        <div className="mx-auto max-w-2xl rounded-xl border border-white/10 bg-charcoal p-6">
          <p className="font-mono text-xs uppercase tracking-widest text-electric-blue">
            Runtime Diagnostic
          </p>
          <h1 className="mt-2 font-display text-2xl font-bold">
            Application Error Detail
          </h1>
          <pre className="mt-4 overflow-x-auto whitespace-pre-wrap rounded-lg bg-obsidian p-4 font-mono text-xs text-red-300">
            {error?.message || "Unknown client error"}
          </pre>
          <button
            type="button"
            onClick={() => reset()}
            className="mt-5 rounded-full bg-white px-6 py-2.5 text-xs font-semibold text-obsidian"
          >
            Reload View
          </button>
        </div>
      </body>
    </html>
  );
}
