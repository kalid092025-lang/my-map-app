export default function Filters({ onSelect }) {
  return (
    <div className="filters">
      <button onClick={() => onSelect("catering.cafe")}>Kafe</button>
      <button onClick={() => onSelect("catering.restaurant")}>Restaurant</button>
      <button onClick={() => onSelect("accommodation.hotel")}>Hotell</button>
      <button onClick={() => onSelect("commercial.supermarket")}>Supermarked</button>
    </div>
  );
}
