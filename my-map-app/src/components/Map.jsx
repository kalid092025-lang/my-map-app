import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export default function Map({ center, places }) {
  const mapRef = useRef(null);

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

    // Add markers for places
    places.forEach((p) => {
      L.marker([p.lat, p.lon]).addTo(mapRef.current).bindPopup(p.name);
    });
  }, [center, places]);

  return <div id="map" style={{ height: "500px", width: "100%" }}></div>;
}
