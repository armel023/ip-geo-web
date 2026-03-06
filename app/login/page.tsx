"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import loginAction from "./server-actions";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;
    const result = await loginAction(username, password);
    setLoading(false);
    if (result?.error) {
      setError(result.error);
    } else {
      router.replace("/");
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-sky-50 to-white dark:from-slate-950 dark:via-slate-900 dark:to-black">
      <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-sky-200/30 blur-3xl dark:bg-sky-500/10" />
      <div className="absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-blue-200/30 blur-3xl dark:bg-blue-500/10" />

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-5xl items-center px-4 py-16 sm:px-8">
        <div className="grid w-full gap-10 rounded-3xl bg-white/80 p-8 shadow-2xl shadow-sky-200/40 backdrop-blur xl:p-12 dark:bg-slate-950/70 dark:shadow-none lg:grid-cols-[1.05fr_0.95fr]">
          <section className="flex flex-col justify-center space-y-6">
            <div className="space-y-4">
              <p className="inline-flex items-center rounded-full border border-slate-200/60 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:border-slate-800 dark:text-slate-300">
                Secure Portal
              </p>
              <h1 className="text-3xl font-semibold text-slate-900 dark:text-white sm:text-4xl">
                Welcome back. Sign in to continue your IP intelligence workflow.
              </h1>
              <p className="text-base text-slate-600 dark:text-slate-300">
                Stay in sync across devices, manage your lookup history, and access premium geolocation insights with a single login.
              </p>
            </div>
            <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
              <li className="flex items-center gap-3">
                <span className="h-8 w-8 rounded-full bg-sky-100 text-sky-600 dark:bg-sky-500/10 dark:text-sky-300 inline-flex items-center justify-center font-semibold">
                  1
                </span>
                Instant access to live dashboards
              </li>
              <li className="flex items-center gap-3">
                <span className="h-8 w-8 rounded-full bg-sky-100 text-sky-600 dark:bg-sky-500/10 dark:text-sky-300 inline-flex items-center justify-center font-semibold">
                  2
                </span>
                Encrypted storage for your history
              </li>
              <li className="flex items-center gap-3">
                <span className="h-8 w-8 rounded-full bg-sky-100 text-sky-600 dark:bg-sky-500/10 dark:text-sky-300 inline-flex items-center justify-center font-semibold">
                  3
                </span>
                Mobile-ready experience at any scale
              </li>
            </ul>
          </section>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-6 rounded-2xl border border-slate-200/60 bg-white p-8 shadow-xl shadow-sky-100 dark:border-slate-800 dark:bg-slate-900/80 dark:shadow-none"
          >
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-white text-center">
                Login
              </h2>
              <p className="text-center text-sm text-slate-500 dark:text-slate-400">
                Use your workspace credentials to continue
              </p>
            </div>

            <label className="space-y-2 text-sm font-medium text-slate-600 dark:text-slate-200">
              Username
              <input
                type="text"
                name="username"
                placeholder="your.name"
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-900 transition focus:border-transparent focus:outline-none focus:ring-2 focus:ring-sky-500 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                required
              />
            </label>

            <label className="space-y-2 text-sm font-medium text-slate-600 dark:text-slate-200">
              Password
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-900 transition focus:border-transparent focus:outline-none focus:ring-2 focus:ring-sky-500 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                required
              />
            </label>

            {error && (
              <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-500/40 dark:bg-red-500/10 dark:text-red-200" role="alert">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="inline-flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 px-4 py-3 text-base font-semibold text-white shadow-lg shadow-sky-500/30 transition hover:translate-y-px focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>

            <p className="text-center text-xs text-slate-400 dark:text-slate-500">
              Protected by enterprise-grade encryption &amp; audit logging
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
