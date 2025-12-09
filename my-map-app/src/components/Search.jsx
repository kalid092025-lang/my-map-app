import { useState } from "react";

export default function Search({ onSelect }) {
  const API_KEY = import.meta.env.VITE_GEOAPIFY_KEY;
  const [text, setText] = useState("");
  const [results, setResults] = useState([]);

  const search = async (value) => {
    setText(value);
    if (value.length < 2) return setResults([]);

    const url = `https://api.geoapify.com/v1/geocode/autocomplete?text=${value}&apiKey=${API_KEY}`;
    const res = await fetch(url);
    const data = await res.json();

    setResults(data.features || []);
  };

  return (
    <div className="search-container">
      <input
        value={text}
        onChange={(e) => search(e.target.value)}
        placeholder="Søk sted…"
      />

      <div className="autocomplete-list">
        {results.map((r, i) => (
          <div
            key={i}
            className="autocomplete-item"
            onClick={() => {
              onSelect({ lat: r.properties.lat, lon: r.properties.lon });
              setText(r.properties.formatted);
              setResults([]);
            }}
          >
            {r.properties.formatted}
          </div>
        ))}
      </div>
    </div>
  );
}
