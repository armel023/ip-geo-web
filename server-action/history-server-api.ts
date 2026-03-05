"use server";

const apiUrl = process.env.IP_GEO_API_URL || "http://localhost:5069/";

export default async function fetchHistory(searchParams: { ip?: string; from?: string; to?: string; desc?: boolean; skip?: number; take?: number }) {
  const res = await fetch(apiUrl + "api/history?" + new URLSearchParams(searchParams as Record<string, string>));
  if (!res.ok) throw new Error("Failed to fetch history");
  return res.json();
}

export async function deleteHistory(ids: string[]) {
  const res = await fetch(apiUrl + "api/history", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(ids),
  });
  if (!res.ok) throw new Error("Failed to delete history");
}