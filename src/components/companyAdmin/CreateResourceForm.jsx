import { useState } from "react";
import { useDispatch } from "react-redux";
import { createResource } from "../../redux/slices/resourceSlice";

export default function CreateResourceForm({ floorId }) {
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    floorId,
    resourceTypeId: 1, // 1 = Desk, 2 = Meeting Room
    x: 50,
    y: 50,
    width: 60,
    height: 60,
    rotation: 0,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: Number(e.target.value) });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createResource(form));
  };

  return (
    <form onSubmit={handleSubmit} className="create-form">
      <h4>Add Resource</h4>

      <select
        name="resourceTypeId"
        value={form.resourceTypeId}
        onChange={handleChange}
      >
        <option value={1}>Desk</option>
        <option value={2}>Meeting Room</option>
      </select>

      <button type="submit">Add</button>
    </form>
  );
}
