"use client";

import { LatLngExpression, LatLngTuple } from "leaflet";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";

import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import { useEffect } from "react";

interface MapProps {
  posix: LatLngExpression | LatLngTuple;
  zoom?: number;
  poiInfo?: string;
}

const defaults = {
  zoom: 15,
  maxZoom: 19,
};

export default function Map({
  posix,
  zoom = defaults.zoom,
  poiInfo,
}: MapProps) {
  console.log("Rendering Map with posix:", posix, "and zoom:", zoom);
  function ChangeView({ center }: { center: LatLngTuple }) {
    const map = useMap();

    useEffect(() => {
      map.setView(center, map.getZoom());
    }, [center, map]);

    return null;
  }

  return (
    <MapContainer
      center={posix}
      zoom={zoom}
      scrollWheelZoom={false}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={posix} draggable={true}>
        <Popup>{poiInfo || "You are here!"}</Popup>
      </Marker>
      <ChangeView center={posix as LatLngTuple} />
    </MapContainer>
  );
}
