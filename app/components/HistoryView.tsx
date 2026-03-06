"use client";
import { useEffect, useState } from "react";
import HistoryList, { HistoryItem } from "./HistoryList";
import { GeoInfo } from "./IGeoInfo";
import { mapIpInfoJson } from "./mapIpInfoJson";
import fetchHistory, { deleteHistory } from "@/server-action/history-server-api";

interface HistoryViewProps {
  searchIp?: string;
  onClickItem: (geoInfo: GeoInfo) => void;
}

export default function HistoryView({
  searchIp,
  onClickItem,
}: HistoryViewProps) {
  const [items, setItems] = useState<HistoryItem[]>([]);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [error, setError] = useState("");
  const [selectedItem, setSelectedItem] = useState<HistoryItem | null>(null);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const take = 5;
  const [ip, setIp] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [desc, setDesc] = useState(false);

  useEffect(() => {
    fetchList();

    // eslint-disable-next-line
  }, [page, take, ip, from, to, desc, searchIp]);

  useEffect(() => {
    setPage(1);
  }, [ip, from, to]);

  useEffect(() => {
    if (!selectedItem) return;
    const geoInfo: GeoInfo | null = mapIpInfoJson(selectedItem.ipInfoJson);
    if (geoInfo) {
      onClickItem(geoInfo);
    }
  }, [selectedItem, onClickItem]);

  async function fetchList() {
    setError("");
    try {
      const res = await fetchHistory({
        ip,
        from,
        to,
        desc,
        skip: (page - 1) * take,
        take,
      });
      setItems(res.items);
      setTotal(res.total);
      setSelectedIds(new Set());
    } catch (e) {
      setError("Failed to fetch history");
    } 
  }

  function handleSelect(id: string, checked: boolean) {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (checked) next.add(id);
      else next.delete(id);
      return next;
    });
  }

  async function handleDelete() {
    setError("");
    try {
      await deleteHistory(Array.from(selectedIds));
      await fetchList();
    } catch (e) {
      setError("Failed to delete selected items");
    } finally {
    }
  }

  function handleClickItem(item: HistoryItem) {
    setSelectedItem(item);
  }

  function handlePageChange(newPage: number) {
    setPage(newPage);
  }

  return (
    <section className=" w-full space-y-6 rounded-3xl border border-slate-200/70 bg-white/95 p-6 shadow-2xl shadow-sky-100 backdrop-blur dark:border-slate-800 dark:bg-slate-950/80 dark:shadow-none">
      <header className="flex flex-col gap-2 border-b border-slate-200/60 pb-4 dark:border-slate-800">

        <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-400 dark:text-slate-500">
          History Explorer
        </p>
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600 dark:bg-slate-900 dark:text-slate-300">
            {total} total entries
          </span>
        </div>
      </header>

      <div className="grid bg-white/80 text-sm  md:grid-cols-[1.5fr_auto]">
        <div className="grid gap-3 sm:grid-cols-3">
          <label className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400 dark:text-slate-500">
            IP filter
            <input
              type="text"
              placeholder="Search IP"
              value={ip}
              onChange={(e) => setIp(e.target.value)}
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-white/90 px-3 py-2 text-sm text-slate-900 outline-none focus:border-transparent focus:ring-2 focus:ring-sky-500 dark:border-slate-800 dark:bg-slate-950/70 dark:text-white"
            />
          </label>
          <label className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400 dark:text-slate-500">
            From
            <input
              type="date"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-white/90 px-3 py-2 text-sm text-slate-900 outline-none focus:border-transparent focus:ring-2 focus:ring-sky-500 dark:border-slate-800 dark:bg-slate-950/70 dark:text-white"
            />
          </label>
          <label className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400 dark:text-slate-500">
            To
            <input
              type="date"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-white/90 px-3 py-2 text-sm text-slate-900 outline-none focus:border-transparent focus:ring-2 focus:ring-sky-500 dark:border-slate-800 dark:bg-slate-950/70 dark:text-white"
            />
          </label>
        </div>
        <div className="ml-3 flex flex-col justify-between gap-3 md:items-end">
          <label className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400 dark:text-slate-500">
            Sort
            <select
              value={desc ? "desc" : "asc"}
              onChange={(e) => setDesc(e.target.value === "desc")}
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-white/90 px-3 py-2 text-sm text-slate-900 outline-none focus:border-transparent focus:ring-2 focus:ring-sky-500 dark:border-slate-800 dark:bg-slate-950/70 dark:text-white"
            >
              <option value="asc">Asc</option>
              <option value="desc">Desc</option>
            </select>
          </label>
        </div>
      </div>
      <div className="flex items-center justify-end gap-3">
        <button
          onClick={handleDelete}
          className="inline-flex items-center justify-center rounded-2xl bg-red-500/90 px-4 py-2 text-sm font-semibold text-white shadow transition hover:bg-red-600 disabled:opacity-50"
        >
          Delete Selected
        </button>
      </div>
      {error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600 dark:border-red-500/40 dark:bg-red-500/10 dark:text-red-200">
          {error}
        </div>
      )}

      <HistoryList
        items={items}
        selectedIds={selectedIds}
        onSelect={handleSelect}
        onClickItem={handleClickItem}
      />

      <div className="flex flex-col gap-3 rounded-2xl border border-slate-100 bg-white/80 p-4 text-sm text-slate-600 shadow-sm dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-300 sm:flex-row sm:items-center sm:justify-between">
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
          className="inline-flex items-center justify-center rounded-2xl border border-slate-300 px-4 py-2 font-semibold text-slate-700 transition hover:border-slate-400 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:text-white"
        >
          Prev
        </button>
        <span className="text-center text-xs font-semibold uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">
          Page {page} / {Math.ceil(total / take) || 1}
        </span>
        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={page * take >= total}
          className="inline-flex items-center justify-center rounded-2xl border border-slate-300 px-4 py-2 font-semibold text-slate-700 transition hover:border-slate-400 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:text-white"
        >
          Next
        </button>
      </div>
    </section>
  );
}
