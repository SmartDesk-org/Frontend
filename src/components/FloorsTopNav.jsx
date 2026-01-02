import "../styles/floorsTopNav.css";

export default function FloorsTopNav({ floors, activeFloorId, onSelect }) {
  return (
    <div className="d-flex gap-2 mb-3 flex-wrap">
      {floors.map((f) => (
        <button
          key={f.floorId}
          className={`btn btn-sm ${
            f.id === activeFloorId ? "btn-dark" : "btn-outline-dark"
          }`}
          onClick={() => onSelect(f)}
        >
          {f.floorName}
        </button>
      ))}
    </div>
  );
}
