import { useSelector } from "react-redux";

export default function DesksPage() {
  const { desks } = useSelector((s) => s.resources);

  return (
    <div>
      <h3 className="text-white">Live Map</h3>
      
    </div>
  );
}
