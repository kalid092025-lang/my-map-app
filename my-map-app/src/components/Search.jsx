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
const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (results[0]) {
        // Select first result automatically
        onSelect({
          lat: results[0].properties.lat,
          lon: results[0].properties.lon,
        });
        setText(results[0].properties.formatted);
        setResults([]);
      } else {
        // If no results, do a search
        search(text);
      }
    }
  };


  return (
    <div className="search-container">
      <input
        value={text}
        onChange={(e) => search(e.target.value)}
        onKeyDown={handleKeyDown}
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
