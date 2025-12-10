import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export default function Map({ center, places }) {
  const mapRef = useRef(null);
  const markersRef = useRef([]);

  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = L.map("map").setView([center.lat, center.lon], 13);

      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(mapRef.current);
    } else {
      mapRef.current.setView([center.lat, center.lon], 13);
    }

    // Remove old markers
    markersRef.current.forEach((m) => mapRef.current.removeLayer(m));
    markersRef.current = [];

    // Add new markers
    places?.forEach((p) => {
      if (!p || !p.lat || !p.lon) return;

      const marker = L.marker([p.lat, p.lon])
        .addTo(mapRef.current)
        .bindPopup(p.name || "Ukjent sted")
        .bindTooltip(p.name || "Ukjent sted", { permanent: true, direction: "top" });

      markersRef.current.push(marker);
    });
  }, [center, places]);

  return <div id="map" style={{ height: "100%", width: "100%" }}></div>;
}
