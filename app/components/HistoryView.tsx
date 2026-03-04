"use client";
import { useEffect, useState } from "react";
import HistoryList, { HistoryItem } from "./HistoryList";
import { GeoInfo } from "./IGeoInfo";
import { mapIpInfoJson } from "./mapIpInfoJson";

interface HistoryViewProps {
    onClickItem: (geoInfo: GeoInfo) => void;
}

export default function HistoryView({ onClickItem }: HistoryViewProps) {
  const [items, setItems] = useState<HistoryItem[]>([]);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [showDelete, setShowDelete] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedItem, setSelectedItem] = useState<HistoryItem | null>(null);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [take, setTake] = useState(5);
  const [ip, setIp] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [sortBy, setSortBy] = useState("ip");
  const [desc, setDesc] = useState(false);

  useEffect(() => {
    fetchList();

    // eslint-disable-next-line
  }, [page, take, ip, from, to, sortBy, desc]);

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
    setLoading(true);
    setError("");
    try {
      const params = new URLSearchParams({
        ip,
        from,
        to,
        sortBy,
        desc: String(desc),
        skip: String((page - 1) * take),
        take: String(take),
      });
      const res = await fetch(`/api/history?${params.toString()}`);
      if (!res.ok) throw new Error("Failed to fetch history");
      const data = await res.json();
      setItems(data.items);
      setTotal(data.total);
      setSelectedIds(new Set());
    } catch (e) {
      setError("Failed to fetch history");
    } finally {
      setLoading(false);
    }
  }

  function handleSelect(id: string, checked: boolean) {
    setSelectedIds(prev => {
      const next = new Set(prev);
      if (checked) next.add(id);
      else next.delete(id);
      setShowDelete(next.size > 0);
      return next;
    });
  }

  async function handleDelete() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/history", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Array.from(selectedIds)),
      });
      if (!res.ok) throw new Error("Failed to delete");
      await fetchList();
    } catch (e) {
      setError("Failed to delete selected items");
    } finally {
      setLoading(false);
    }
  }

  function handleClickItem(item: HistoryItem) {
    setSelectedItem(item);
  }

  function handlePageChange(newPage: number) {
    setPage(newPage);
  }

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <div className="mb-4 flex gap-2">
        <input
          type="text"
          placeholder="Search IP"
          value={ip}
          onChange={e => setIp(e.target.value)}
          className="border p-1 rounded"
        />
        <input
          type="date"
          value={from}
          onChange={e => setFrom(e.target.value)}
          className="border p-1 rounded"
        />
        <input
          type="date"
          value={to}
          onChange={e => setTo(e.target.value)}
          className="border p-1 rounded"
        />
        <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="border p-1 rounded">
          <option value="ip">IP</option>
        </select>
        <select value={desc ? "desc" : "asc"} onChange={e => setDesc(e.target.value === "desc")} className="border p-1 rounded">
          <option value="asc">Asc</option>
          <option value="desc">Desc</option>
        </select>
        <select value={take} onChange={e => setTake(Number(e.target.value))} className="border p-1 rounded">
          <option value={5}>5</option>
          <option value={10}>10</option>
        </select>
      </div>
      {showDelete && (
        <button onClick={handleDelete} className="mb-2 bg-red-500 text-white px-3 py-1 rounded">Delete Selected</button>
      )}
      {error && <div className="text-red-500 mb-2">{error}</div>}
      <HistoryList
        items={items}
        selectedIds={selectedIds}
        onSelect={handleSelect}
        onClickItem={handleClickItem}
      />
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
          className="px-2 py-1 border rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span>Page {page} / {Math.ceil(total / take) || 1}</span>
        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={page * take >= total}
          className="px-2 py-1 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
      {/* {selectedItem && (
        <div className="mt-6">
          <GeoInfoView ip={selectedItem.ip} />
        </div>
      )} */}
    </div>
  );
}
