"use client";

import { useEffect } from "react";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error("Client error caught by error boundary:", error);
  }, [error]);

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-2xl flex-col justify-center px-6 py-16">
      <p className="font-mono text-xs uppercase tracking-widest text-electric-blue">
        Client Runtime Notice
      </p>
      <h1 className="mt-2 font-display text-2xl font-bold text-white sm:text-3xl">
        A client-side error occurred while rendering this view.
      </h1>
      <p className="mt-3 rounded-lg border border-white/10 bg-charcoal p-4 font-mono text-xs text-silver break-words">
        {error?.message || "Unexpected client exception"}
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => reset()}
          className="rounded-full bg-white px-6 py-2.5 text-xs font-semibold text-obsidian transition-colors hover:bg-silver"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
