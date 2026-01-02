import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFloors, setActiveFloor } from '../../redux/slices/floorSlice';
import { createResource, fetchResourcesByFloor, deleteResource } from '../../redux/slices/resourceSlice';

export default function ResourceRegistrationPage() {
  const dispatch = useDispatch();
  const { floors, activeFloor } = useSelector((s) => s.floor);
  const { resources, loading } = useSelector((s) => s.resources);

  const [form, setForm] = useState({
    resourceTypeId: 1, // 1=Desk, 2=MeetingRoom
    name: "" // For MetadataJson
  });

  useEffect(() => {
    dispatch(fetchFloors());
  }, [dispatch]);

  useEffect(() => {
    if (activeFloor?.floorId) {
      dispatch(fetchResourcesByFloor(activeFloor.floorId));
    }
  }, [activeFloor, dispatch]);

  const handleCreate = async (e) => {
    e.preventDefault();
    const payload = {
      floorId: activeFloor.floorId,
      resourceTypeId: Number(form.resourceTypeId),
      x: 0, y: 0, width: 60, height: 60, rotation: 0,
      metadataJson: JSON.stringify({ name: form.name })
    };
    await dispatch(createResource(payload));
    setForm({ ...form, name: "" });
  };

  return (
    <div className="container py-4">
      <h3>1. Register Resources</h3>
      <div className="row g-4">
        <div className="col-md-4">
          <div className="card p-3 shadow-sm">
            <h5>Add New Resource</h5>
            <div className="mb-3">
              <label>Select Floor</label>
              <select className="form-select" value={activeFloor?.floorId} onChange={(e) => dispatch(setActiveFloor(floors.find(f => f.floorId == e.target.value)))}>
                {floors.map(f => <option key={f.floorId} value={f.floorId}>{f.floorName}</option>)}
              </select>
            </div>
            <form onSubmit={handleCreate}>
              <div className="mb-3">
                <label>Type</label>
                <select className="form-select" value={form.resourceTypeId} onChange={(e) => setForm({...form, resourceTypeId: e.target.value})}>
                  <option value={1}>Desk</option>
                  <option value={2}>Meeting Room</option>
                </select>
              </div>
              <div className="mb-3">
                <label>Label/Name</label>
                <input className="form-control" placeholder="e.g. Desk A-1" value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} required />
              </div>
              <button className="btn btn-primary w-100" type="submit">Register Resource</button>
            </form>
          </div>
        </div>
        
        <div className="col-md-8">
          <div className="card shadow-sm">
            <div className="card-header bg-white">Resources on {activeFloor?.floorName}</div>
            <div className="table-responsive">
              <table className="table align-middle">
                <thead>
                  <tr>
                    <th>Type</th>
                    <th>Name</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {resources.map(r => (
                    <tr key={r.id}>
                      <td>{r.resourceTypeId === 1 ? '🖥️ Desk' : '🤝 Meeting Room'}</td>
                      <td>{JSON.parse(r.metadataJson || "{}").name || `ID: ${r.id}`}</td>
                      <td>{r.x === 0 && r.y === 0 ? <span className="badge bg-warning">Unplaced</span> : <span className="badge bg-success">Placed</span>}</td>
                      <td>
                        <button className="btn btn-sm btn-outline-danger" onClick={() => dispatch(deleteResource(r.id))}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}