import { useState } from "react";
import { useDispatch } from "react-redux";
import { createFloor, fetchFloors } from "../../redux/slices/floorSlice";
import { X } from "lucide-react";

export default function CreateFloorForm({ show, onHide }) {
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    floorName: "",
    floorNumber: "",
    width: 800,
    height: 400,
  });

  if (!show) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(createFloor(form));
    dispatch(fetchFloors());
    setForm({ ...form, floorName: "", floorNumber: "" });
    onHide();
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-[#0A0A0A] border border-neutral-800 rounded-xl shadow-2xl p-6 relative">
        <button
          onClick={onHide}
          className="absolute top-4 right-4 text-neutral-500 hover:text-white"
        >
          <X size={20} />
        </button>

        <h2 className="text-lg font-bold text-white mb-6 uppercase tracking-wide">
          New Floor
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-mono text-neutral-500 uppercase block mb-1">
              Floor Name
            </label>
            <input
              name="floorName"
              className="w-full bg-[#111] border border-neutral-800 rounded p-3 text-sm text-white focus:border-white focus:outline-none"
              placeholder="e.g. Engineering Zone"
              value={form.floorName}
              onChange={(e) =>
                setForm({ ...form, [e.target.name]: e.target.value })
              }
              required
            />
          </div>
          <div>
            <label className="text-xs font-mono text-neutral-500 uppercase block mb-1">
              Level Number
            </label>
            <input
              name="floorNumber"
              type="number"
              className="w-full bg-[#111] border border-neutral-800 rounded p-3 text-sm text-white focus:border-white focus:outline-none"
              placeholder="1"
              value={form.floorNumber}
              onChange={(e) =>
                setForm({ ...form, [e.target.name]: e.target.value })
              }
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-white text-black font-bold text-xs uppercase tracking-widest rounded hover:bg-neutral-200 transition-colors mt-2"
          >
            Create Floor
          </button>
        </form>
      </div>
    </div>
  );
}
