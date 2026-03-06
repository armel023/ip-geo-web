import React from "react";
import { GeoInfo } from "./IGeoInfo";

interface GeoInfoCardProps {
  geo: GeoInfo;
}

const GeoInfoCard: React.FC<GeoInfoCardProps> = ({ geo }) => (
  <section className="w-full rounded-2xl border border-sky-100 bg-sky-50/90 p-4 shadow-lg shadow-sky-100 backdrop-blur dark:border-slate-800 dark:bg-slate-950/70 dark:shadow-none">
    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800">
      <div>
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
          IP Geolocation Info
        </h2>
      </div>
      <span className="rounded-full bg-sky-100 px-3 py-0.5 text-[0.65rem] font-semibold text-sky-600 dark:bg-sky-500/10 dark:text-sky-200">
        Live Data
      </span>
    </div>

    <dl className="mt-4 grid gap-3 text-sm text-slate-600 sm:grid-cols-2 dark:text-slate-300">
      <div className="rounded-xl border border-white/60 bg-white/70 p-3 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
        <dt className="text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-slate-400 dark:text-slate-500">
          IP
        </dt>
        <dd className="mt-1 text-base font-medium text-slate-900 dark:text-white">{geo.ip}</dd>
      </div>
      <div className="rounded-xl border border-white/60 bg-white/70 p-3 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
        <dt className="text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-slate-400 dark:text-slate-500">
          City
        </dt>
        <dd className="mt-1 text-base font-medium text-slate-900 dark:text-white">{geo.city}</dd>
      </div>
      <div className="rounded-xl border border-white/60 bg-white/70 p-3 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
        <dt className="text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-slate-400 dark:text-slate-500">
          Region
        </dt>
        <dd className="mt-1 text-base font-medium text-slate-900 dark:text-white">{geo.region}</dd>
      </div>
      <div className="rounded-xl border border-white/60 bg-white/70 p-3 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
        <dt className="text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-slate-400 dark:text-slate-500">
          Country
        </dt>
        <dd className="mt-1 text-base font-medium text-slate-900 dark:text-white">{geo.country}</dd>
      </div>
      <div className="rounded-xl border border-white/60 bg-white/70 p-3 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
        <dt className="text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-slate-400 dark:text-slate-500">
          Location
        </dt>
        <dd className="mt-1 text-base font-medium text-slate-900 dark:text-white">{geo.loc}</dd>
      </div>
      <div className="rounded-xl border border-white/60 bg-white/70 p-3 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
        <dt className="text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-slate-400 dark:text-slate-500">
          Org
        </dt>
        <dd className="mt-1 text-base font-medium text-slate-900 dark:text-white">{geo.org}</dd>
      </div>
      <div className="rounded-xl border border-white/60 bg-white/70 p-3 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
        <dt className="text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-slate-400 dark:text-slate-500">
          Postal
        </dt>
        <dd className="mt-1 text-base font-medium text-slate-900 dark:text-white">{geo.postal}</dd>
      </div>
      <div className="rounded-xl border border-slate-100 bg-white/70 p-3 dark:border-slate-800 dark:bg-slate-900/60">
        <dt className="text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-slate-400 dark:text-slate-500">
          Timezone
        </dt>
        <dd className="mt-1 text-base font-medium text-slate-900 dark:text-white">{geo.timezone}</dd>
      </div>
    </dl>
  </section>
);

export default GeoInfoCard;
