import { useSelector } from "react-redux";

export default function DesksPage() {
  const { desks } = useSelector((s) => s.resources);

  return (
    <div>
      <h3>Desks</h3>
      <ul>
        {desks.map((d) => (
          <li key={d.id}>
            {d.code} – {d.status}
          </li>
        ))}
      </ul>
    </div>
  );
}
