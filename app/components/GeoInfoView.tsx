"use client";
import dynamic from "next/dynamic";

const MapComponent = dynamic(() => import("@/app/components/Map"), {
  ssr: false,
});
import { useEffect, useState } from "react";
import GeoInfoCard from "./GeoInfoCard";
import HistoryView from "./HistoryView";
import { GeoInfo } from "./IGeoInfo";
import fetchIpInfo, { fetchMyIpInfo } from "@/server-action/ip-info-server-api";


export default function GeoInfoView() {
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
      const data = await fetchIpInfo(searchIp);
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
      if (searchIp === "") {  
        setLoading(true);
        try {
          const data = await fetchMyIpInfo();
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
  }, [searchIp]);

  const searchFormComponent = () => {
    return (
      <form
        onSubmit={handleSearch}
        className=" bg-white/90 pl-4 pr-8 focus-within:shadow-sky-200 dark:bg-slate-950/70"
      >

        <label className="group relative block">
          <span className="sr-only">IP Address</span>
          <span className="absolute left-4 top-3 text-xs font-semibold uppercase tracking-[0.3em] text-slate-400 group-focus-within:text-sky-500 dark:text-slate-500">
            IP ADDRESS
          </span>
          <input
            type="text"
            value={searchIp}
            onChange={(e) => setSearchIp(e.target.value)}
            placeholder="Enter IPv4 or IPv6 address"
            className="mt-7 w-full rounded-2xl border border-slate-200 bg-white/90 px-4 py-3 text-base text-slate-900 outline-none ring-0 transition focus:border-transparent focus:ring-2 focus:ring-sky-500 dark:border-slate-800 dark:bg-slate-900/70 dark:text-white"
            required
            autoFocus
          />
        </label>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <button
            type="submit"
            className="flex-1 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 px-4 py-3 text-base font-semibold text-white shadow-md shadow-sky-500/30 transition hover:translate-y-px disabled:opacity-60"
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg
                  className="h-5 w-5 animate-spin text-white"
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
            className="flex-1 rounded-2xl border border-slate-300 bg-white/70 px-4 py-3 text-base font-semibold text-slate-600 transition hover:border-slate-400 dark:border-slate-700 dark:bg-slate-900/60 dark:text-white"
          >
            Clear
          </button>
        </div>
      </form>
    );
  };
  
  const errorMessageComponent = () => {
    return error ? (
      <div className="text-red-500 font-medium text-center">{error}</div>
    ) : null;
  }

  const geoInfoComponent = () => {
    return geo ? (
      <div className="pl-4 pr-8">
        <GeoInfoCard geo={geo} />
      </div>) : (
      <div className="text-gray-500 text-center py-10">
        No IP information to display. Please search for an IP address.
      </div>
    );
  }

  const historyComponent = () => {
    return (
      <div className="mt-4 pl-4 pr-8">
        <HistoryView onClickItem={setGeo} searchIp={addedIp} />
      </div>
    );
  };

  const searchIpComponent = () => {
    return (
      <div className="flex-1 bg-white shadow-lg flex flex-col gap-6 min-w-[320px]">
        {searchFormComponent()}
        {errorMessageComponent()}
        {geoInfoComponent()}
        {historyComponent()}
      </div>
    );
  };

  const mapComponent = () => {
    return (<div className="flex-1 p-8 flex items-center justify-center h-320">
        <MapComponent
          posix={geo ? getLatLng(geo) : [0, 0]}
          poiInfo={
            geo
              ? `${geo.ip} - ${geo.org} ${geo.city}, ${geo.country} `
              : "No location data"
          }
        />
      </div>);
  };
  
  return (
    <div className="flex flex-col md:flex-row w-full min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
      {/* Left side: Form, GeoInfoCard, History */}
      {searchIpComponent()}
      {/* Right side: Map */}
      {mapComponent()}
    </div>
  );
}
