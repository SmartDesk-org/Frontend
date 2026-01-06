import { useState } from "react";
import { useDispatch } from "react-redux";
import { createFloor, fetchFloors } from "../../redux/slices/floorSlice";

export default function CreateFloorForm({ show, onHide }) {
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    floorName: "",
    floorNumber: "",
    width: 800, // Default background values
    height: 400,
    scale: 1,
  });

  if (!show) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(createFloor(form));
    dispatch(fetchFloors()); // refresh list
    setForm({ ...form, floorName: "", floorNumber: "" });
    onHide(); // Close modal after success
  };

  return (
    <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content border-0 shadow">
          <div className="modal-header bg-dark text-white">
            <h5 className="modal-title">Add New Floor</h5>
            <button type="button" className="btn-close btn-close-white" onClick={onHide}></button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body p-4">
              <div className="mb-3">
                <label className="form-label fw-bold">Floor Name</label>
                <input
                  name="floorName"
                  className="form-control"
                  placeholder="e.g. Ground Floor"
                  value={form.floorName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold">Floor Number</label>
                <input
                  name="floorNumber"
                  type="number"
                  className="form-control"
                  placeholder="e.g. 1"
                  value={form.floorNumber}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="modal-footer bg-light">
              <button type="button" className="btn btn-secondary" onClick={onHide}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary px-4">
                Create Floor
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}