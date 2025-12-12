import React, { useState, useEffect } from "react";
import Map from "./components/Map";
import Search from "./components/Search";
import Filters from "./components/Filters";


export default function App() {
  const API_KEY = import.meta.env.VITE_GEOAPIFY_KEY;

  

  const [center, setCenter] = useState({ lat: 59.91, lon: 10.75 });
  const [category, setCategory] = useState(null);
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    if (!category) return;

    const url =
      `https://api.geoapify.com/v2/places?categories=${category}&bias=proximity:` +
      `${center.lon},${center.lat}&limit=20&apiKey=${API_KEY}`;

    fetch(url)
      .then((r) => r.json())
      .then((data) => {
        const formatted = data.features.map((f) => ({
          name: f.properties.name,
          lat: f.geometry.coordinates[1],
          lon: f.geometry.coordinates[0],
        }));
        setPlaces(formatted);
      });
  }, [category, center,API_KEY]);

  return (
    <div style={{ height: "100%", position: "relative" }}>
      <div className="controls">
        <Search onSelect={(loc) => setCenter(loc)} />
        <Filters onSelect={(cat) => setCategory(cat)} />
      </div>

      <Map center={center} places={places} />
    </div>
  );
}
