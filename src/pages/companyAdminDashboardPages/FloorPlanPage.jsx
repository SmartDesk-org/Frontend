import { useSelector } from "react-redux";

export default function FloorPlanPage() {
  const { floorName, resources } = useSelector((s) => s.floor);

  return (
    <div>
      <h3>{floorName} – Floor Plan</h3>

      <div className="floor-grid">
        {resources.map((r) => (
          <div
            key={r.id}
            className={`resource ${r.status.toLowerCase()}`}
            style={{ gridColumn: r.x, gridRow: r.y }}
          >
            {r.type}
            <br />
            {r.status}
          </div>
        ))}
      </div>
    </div>
  );
}
