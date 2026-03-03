import React from "react";

export interface GeoInfo {
  ip: string;
  city: string;
  region: string;
  country: string;
  loc: string;
  org: string;
  postal: string;
  timezone: string;
}

interface GeoInfoCardProps {
  geo: GeoInfo;
}

const GeoInfoCard: React.FC<GeoInfoCardProps> = ({ geo }) => (
  <div className="bg-gray-50 p-4 rounded shadow w-full mb-6">
    <h2 className="text-xl font-semibold mb-2">IP Geolocation Info</h2>
    <div className="text-left">
      <div><b>IP:</b> {geo.ip}</div>
      <div><b>City:</b> {geo.city}</div>
      <div><b>Region:</b> {geo.region}</div>
      <div><b>Country:</b> {geo.country}</div>
      <div><b>Location:</b> {geo.loc}</div>
      <div><b>Org:</b> {geo.org}</div>
      <div><b>Postal:</b> {geo.postal}</div>
      <div><b>Timezone:</b> {geo.timezone}</div>
    </div>
  </div>
);

export default GeoInfoCard;
