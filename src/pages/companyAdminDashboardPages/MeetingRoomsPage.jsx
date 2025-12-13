import { useSelector } from "react-redux";

export default function MeetingRoomsPage() {
  const { rooms } = useSelector((s) => s.resources);

  return (
    <div>
      <h3>Meeting Rooms</h3>
      <ul>
        {rooms.map((r) => (
          <li key={r.id}>
            {r.name} – Capacity {r.capacity}
          </li>
        ))}
      </ul>
    </div>
  );
}
