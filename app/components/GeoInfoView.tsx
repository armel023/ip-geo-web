"use client";

import { useEffect, useState } from "react";
import GeoInfoCard, { GeoInfo } from "./GeoInfoCard";

export default function GeoInfoView() {
    const [geo, setGeo] = useState<GeoInfo | null>(null);
    // const [ip, setIp] = useState("");
    const [searchIp, setSearchIp] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    function validateIp(ip: string) {
      // IPv4
      const ipv4 = /^(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)){3}$/;
      // IPv6
      const ipv6 = /^([\da-fA-F]{1,4}:){7}[\da-fA-F]{1,4}$|^([\da-fA-F]{1,4}:){1,7}:$|^([\da-fA-F]{1,4}:){1,6}:[\da-fA-F]{1,4}$/;
      return ipv4.test(ip) || ipv6.test(ip);
    }
    
      async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!validateIp(searchIp)) {
      setError("Invalid IP address format.");
      return;
    }
    setLoading(true);
    try {
      let url = "/api/ipinfo";
      if (searchIp) {
        url += `?ip=${encodeURIComponent(searchIp)}`;
      }
      const res = await fetch(url);
      if (!res.ok) throw new Error("Not found");
      const data = await res.json();
      setGeo(data);
    } catch (e) {
      setError("Failed to fetch IP info.");
    } finally {
      setLoading(false);
    }
  }

    useEffect(() => {
      async function fetchGeo() {
        if(searchIp === "") {
            setLoading(true);
          try {
            const res = await fetch("/api/ipinfo");
            if (!res.ok) throw new Error("Not found");
            const data = await res.json();
            setGeo(data);
          } catch (e) {
            setError("Failed to fetch initial IP info.");
          } finally {
            setLoading(false);
          }
        }
      }

      fetchGeo();
    }, [searchIp]);
  return (
    <div>
        <form onSubmit={handleSearch} className="w-full flex flex-col items-center mb-6">
          <input
            type="text"
            value={searchIp}
            onChange={e => setSearchIp(e.target.value)}
            placeholder="Enter IPv4 or IPv6 address"
            className="w-full p-2 mb-2 border rounded"
            required
          />
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 mb-2" disabled={loading}>
            {loading ? "Searching..." : "Search"}
          </button>
          <button onClick={()=> setSearchIp("")} className="w-full bg-gray-500 text-white p-2 rounded hover:bg-gray-600 mb-2" >
            Clear
          </button>
        </form>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        {geo && <GeoInfoCard geo={geo} />}
    </div>
  )
}
