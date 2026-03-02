"use client";
import dynamic from "next/dynamic";

const MapComponent = dynamic(() => import("@/app/components/Map"), {
  ssr: false,
});
import { useEffect, useState } from "react";
import GeoInfoCard from "./GeoInfoCard";
import HistoryView from "./HistoryView";
import { GeoInfo } from "./IGeoInfo";

interface GeoInfoViewProps {
  ip?: string;
}

export default function GeoInfoView({ ip: propIp }: GeoInfoViewProps) {
  const [geo, setGeo] = useState<GeoInfo | null>(null);
  const [searchIp, setSearchIp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [addedIp, setAddedIp] = useState("");

  function getLatLng(geo: GeoInfo) {
    if (!geo.loc) return [0, 0] as [number, number];
    const latlong = geo.loc.split(",");
    const latlongParsed = [parseFloat(latlong[0]), parseFloat(latlong[1])] as [
      number,
      number,
    ];
    console.log("Parsed latlong:", latlongParsed);
    return latlongParsed;
  }
  function validateIp(ip: string) {
    // IPv4
    const ipv4 =
      /^(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)){3}$/;
    // IPv6
    const ipv6 =
      /^([\da-fA-F]{1,4}:){7}[\da-fA-F]{1,4}$|^([\da-fA-F]{1,4}:){1,7}:$|^([\da-fA-F]{1,4}:){1,6}:[\da-fA-F]{1,4}$/;
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
      setAddedIp(searchIp);
    } catch (e) {
      setError("Failed to fetch IP info.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    async function fetchGeo() {
      setError("");
      if (propIp) {
        setLoading(true);
        try {
          const url = `/api/ipinfo?ip=${encodeURIComponent(propIp)}`;
          const res = await fetch(url);
          if (!res.ok) throw new Error("Not found");
          const data = await res.json();
          setGeo(data);
          setSearchIp(propIp);
          setAddedIp(propIp);
        } catch (e) {
          setError("Failed to fetch IP info.");
        } finally {
          setLoading(false);
        }
      } else if (searchIp === "") {
        setLoading(true);
        try {
          const res = await fetch("/api/ipinfo");
          if (!res.ok) throw new Error("Not found");
          const data = await res.json();
          setGeo(data);
          setAddedIp(data.ip);
        } catch (e) {
          setError("Failed to fetch initial IP info.");
        } finally {
          setLoading(false);
        }
      }
    }
    fetchGeo();
  }, [searchIp, propIp]);
  return (
    <div className="flex flex-col md:flex-row gap-8 w-full min-h-screen p-6 md:p-10 bg-gradient-to-br from-blue-50 to-gray-100">
      {/* Left side: Form, GeoInfoCard, History */}
      <div className="flex-1 bg-white rounded-xl shadow-lg p-8 flex flex-col gap-6 min-w-[320px]">
        <form onSubmit={handleSearch} className="flex flex-col gap-3">
          <input
            type="text"
            value={searchIp}
            onChange={(e) => setSearchIp(e.target.value)}
            placeholder="Enter IPv4 or IPv6 address"
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            required
            autoFocus
          />
          <div className="flex gap-2">
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-60"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8z"
                    ></path>
                  </svg>
                  Searching...
                </span>
              ) : (
                "Search"
              )}
            </button>
            <button
              type="button"
              onClick={() => setSearchIp("")}
              className="flex-1 bg-gray-400 text-white p-3 rounded-lg hover:bg-gray-500 transition"
            >
              Clear
            </button>
          </div>
        </form>
        {error && (
          <div className="text-red-500 font-medium text-center">{error}</div>
        )}
        {geo && <GeoInfoCard geo={geo} />}
        <div className="mt-4">
          <HistoryView onClickItem={setGeo} searchIp={addedIp} />
        </div>
      </div>
      {/* Right side: Map */}
      <div className="flex-1 flex items-center justify-center min-w-[320px]">
        <MapComponent
          posix={geo ? getLatLng(geo) : [0, 0]}
          poiInfo={
            geo
              ? `${geo.ip} - ${geo.org} ${geo.city}, ${geo.country} `
              : "No location data"
          }
        />
      </div>
    </div>
  );
}
