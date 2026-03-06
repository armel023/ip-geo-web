import React from "react";

export interface HistoryItem {
  id: string;
  ip: string;
  geolocation: string;
  ipInfoJson: string;
  createdAt: string;
}

interface HistoryListProps {
  items: HistoryItem[];
  selectedIds: Set<string>;
  onSelect: (id: string, checked: boolean) => void;
  onClickItem: (item: HistoryItem) => void;
}

const HistoryList: React.FC<HistoryListProps> = ({
  items,
  selectedIds,
  onSelect,
  onClickItem,
}) => (
  <section className="w-full bg-white/90 dark:bg-slate-950/70 dark:shadow-none">

    {items.length === 0 ? (
      <div className="rounded-2xl border border-dashed border-slate-200 bg-white/70 px-6 py-8 text-center text-sm text-slate-500 dark:border-slate-800 dark:bg-slate-900/40 dark:text-slate-400">
        No history found. Run a lookup to populate this list.
      </div>
    ) : (
      <ul className="space-y-3">
        {items.map((item) => (
          <li
            key={item.id}
            className="group flex items-stretch gap-3 rounded-2xl border border-slate-100 bg-white/80 p-3 shadow-sm transition hover:-translate-y-0.5 hover:border-sky-200 hover:shadow-md dark:border-slate-800 dark:bg-slate-900/60"
          >
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={selectedIds.has(item.id)}
                onChange={(e) => onSelect(item.id, e.target.checked)}
                className="h-5 w-5 rounded border-slate-300 text-sky-600 focus:ring-sky-500 dark:border-slate-700 dark:bg-slate-900"
                aria-label={`Select ${item.ip}`}
              />
            </label>
            <button
              type="button"
              className="flex flex-1 flex-col gap-1 text-left"
              onClick={() => onClickItem(item)}
            >
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-base text-slate-900 dark:text-white">
                  {item.ip}
                </span>
                <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                  {item.geolocation || "Unknown"}
                </span>
                              <p className="text-xs text-slate-500 dark:text-slate-400">
                {item.createdAt}
              </p>
              </div>
            </button>
          </li>
        ))}
      </ul>
    )}
  </section>
);

export default HistoryList;
