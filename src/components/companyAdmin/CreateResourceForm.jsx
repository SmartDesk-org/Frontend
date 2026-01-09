import { useState } from "react";
import { useDispatch } from "react-redux";
import { createResource } from "../../redux/slices/resourceSlice";
import { X, Monitor, Users } from "lucide-react";

export default function CreateResourceForm({ floorId, onHide, show }) {
  const dispatch = useDispatch();
  const [type, setType] = useState(1);
  const [meta, setMeta] = useState({
    name: "",
    hasAC: false,
    hasSystem: false,
    capacity: 4,
  });

  if (!show) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      createResource({
        floorId,
        resourceTypeId: type,
        x: 100,
        y: 100,
        width: 60,
        height: 60,
        rotation: 0,
        metadataJson: JSON.stringify(meta),
      })
    );
    onHide();
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-[#0A0A0A] border border-neutral-800 rounded-xl shadow-2xl p-6 relative">
        <button
          onClick={onHide}
          className="absolute top-4 right-4 text-neutral-500 hover:text-white"
        >
          <X size={20} />
        </button>

        <h2 className="text-lg font-bold text-white mb-6 uppercase tracking-wide">
          Add Resource
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => setType(1)}
              className={`p-4 rounded border flex flex-col items-center gap-2 transition-all ${
                type === 1
                  ? "bg-white/10 border-white text-white"
                  : "bg-[#111] border-neutral-800 text-neutral-500"
              }`}
            >
              <Monitor size={24} />{" "}
              <span className="text-xs font-bold uppercase">Desk</span>
            </button>
            <button
              type="button"
              onClick={() => setType(2)}
              className={`p-4 rounded border flex flex-col items-center gap-2 transition-all ${
                type === 2
                  ? "bg-white/10 border-white text-white"
                  : "bg-[#111] border-neutral-800 text-neutral-500"
              }`}
            >
              <Users size={24} />{" "}
              <span className="text-xs font-bold uppercase">Room</span>
            </button>
          </div>

          <div>
            <label className="text-xs font-mono text-neutral-500 uppercase block mb-1">
              Identifier
            </label>
            <input
              className="w-full bg-[#111] border border-neutral-800 rounded p-3 text-sm text-white focus:border-white focus:outline-none"
              placeholder="e.g. D-101"
              value={meta.name}
              onChange={(e) => setMeta({ ...meta, name: e.target.value })}
              required
            />
          </div>

          <div className="flex gap-4">
            <label className="flex items-center gap-2 text-sm text-neutral-400 cursor-pointer">
              <input
                type="checkbox"
                className="accent-white"
                checked={meta.hasAC}
                onChange={(e) => setMeta({ ...meta, hasAC: e.target.checked })}
              />{" "}
              Air Con
            </label>
            <label className="flex items-center gap-2 text-sm text-neutral-400 cursor-pointer">
              <input
                type="checkbox"
                className="accent-white"
                checked={meta.hasSystem}
                onChange={(e) =>
                  setMeta({ ...meta, hasSystem: e.target.checked })
                }
              />{" "}
              PC System
            </label>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-white text-black font-bold text-xs uppercase tracking-widest rounded hover:bg-neutral-200 transition-colors"
          >
            Deploy Asset
          </button>
        </form>
      </div>
    </div>
  );
}
