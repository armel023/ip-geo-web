import { auth } from "./auth";
import GeoInfoView from "./components/GeoInfoView";
import SignOutButton from "./components/SignOutButton";

export default async function HomePage() {
  const session = await auth();

  if (!session) {
    return (
      <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-white to-sky-50 px-4 dark:from-slate-950 dark:via-slate-900 dark:to-black">
        <div className="absolute inset-0 -z-10">
          <div className="absolute -top-24 left-8 h-72 w-72 rounded-full bg-sky-200/40 blur-3xl dark:bg-sky-500/20" />
          <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-blue-200/30 blur-3xl dark:bg-blue-500/10" />
        </div>
        <div className="w-full max-w-lg rounded-3xl border border-slate-200/70 bg-white/80 p-10 text-center shadow-2xl shadow-sky-100 backdrop-blur dark:border-slate-800 dark:bg-slate-900/70 dark:shadow-none">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.4em] text-slate-400 dark:text-slate-500">
            IP Geo Web
          </p>
          <h1 className="mb-4 text-3xl font-semibold text-slate-900 dark:text-white">
            Access your network intelligence workspace
          </h1>
          <p className="mb-8 text-slate-600 dark:text-slate-300">
            Sign in to view live geolocation insights, historical lookups, and collaborate securely with your team.
          </p>
          <a
            href="/login"
            className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 px-8 py-3 text-base font-semibold text-white shadow-lg shadow-sky-500/30 transition hover:translate-y-px focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900"
          >
            Go to Login
          </a>
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-sky-50 to-white px-4 py-10 dark:from-slate-950 dark:via-slate-900 dark:to-black sm:px-8">
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-32 left-0 h-96 w-96 rounded-full bg-sky-200/30 blur-3xl dark:bg-sky-500/10" />
        <div className="absolute bottom-0 right-0 h-[28rem] w-[28rem] rounded-full bg-blue-200/30 blur-3xl dark:bg-blue-500/10" />
      </div>
        <nav className="flex flex-col gap-4 border-b border-slate-200/70 pb-6 dark:border-slate-800 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-400 dark:text-slate-500">
              Command Center
            </p>
            <h1 className="text-3xl font-semibold text-slate-900 dark:text-white">
              Welcome, {session.user?.name}
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Monitor IP intelligence, recent lookups, and regional insights in one unified dashboard.
            </p>
          </div>
          <div className="flex items-center justify-end">
            <SignOutButton />
          </div>
        </nav>

        <section className="space-y-6">

          <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-lg shadow-sky-100 dark:border-slate-800 dark:bg-slate-950/60 dark:shadow-none">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                  Live Geolocation Lookup
                </h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Query any IP and visualize enriched intel instantly.
                </p>
              </div>
              <span className="rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold text-sky-600 dark:bg-sky-500/10 dark:text-sky-300">
                Real-time
              </span>
            </div>
            <div className="overflow-hidden border-slate-100 dark:border-slate-800">
              <GeoInfoView />
            </div>
          </div>
        </section>
    </main>
  );
}
