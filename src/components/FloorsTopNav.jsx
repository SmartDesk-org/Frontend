import "../styles/floorsTopNav.css";

export default function FloorsTopNav({
  floors,
  activeFloorId,
  onSelect,
}) {
  return (
    <div className="floors-nav">
      {floors.map((f) => (
        <button
          key={f.id}
          className={`floor-tab ${
            f.id === activeFloorId ? "active" : ""
          }`}
          onClick={() => onSelect(f)}
        >
          {f.floorName}
        </button>
      ))}
    </div>
  );
}
