import { useState } from "react";
import { useDispatch } from "react-redux";
import { createResource } from "../../redux/slices/resourceSlice";

export default function CreateResourceForm({ floorId, onHide, show }) {
  const dispatch = useDispatch();
  const [type, setType] = useState(1); // 1 = Desk, 2 = Meeting Room
  
  const [meta, setMeta] = useState({
    name: "",
    hasAC: false,
    hasSystem: false,
    isCabin: false,
    lighting: "bright",
    // Desk Specific
    chargingSlot: false,
    // Meeting Room Specific
    capacity: 4,
    projector: false,
    mic: false
  });

  if (!show) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createResource({
      floorId,
      resourceTypeId: type,
      x: 50, y: 50, width: 60, height: 60, rotation: 0,
      metadataJson: JSON.stringify(meta)
    }));
    onHide();
  };

  return (
    <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Register New Resource</h5>
            <button className="btn-close" onClick={onHide}></button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label>Resource Type</label>
                  <select className="form-select" value={type} onChange={(e) => setType(Number(e.target.value))}>
                    <option value={1}>Desk</option>
                    <option value={2}>Meeting Room</option>
                  </select>
                </div>
                <div className="col-md-6 mb-3">
                  <label>Display Name / ID</label>
                  <input className="form-control" value={meta.name} onChange={(e) => setMeta({...meta, name: e.target.value})} required placeholder="e.g. Desk-01" />
                </div>
              </div>

              <h6 className="mt-3 border-bottom pb-2">Common Features</h6>
              <div className="row g-3 mt-1">
                <div className="col-md-3 form-check form-switch ms-3">
                  <input className="form-check-input" type="checkbox" checked={meta.hasAC} onChange={(e) => setMeta({...meta, hasAC: e.target.checked})} />
                  <label className="form-check-label">Air Conditioning</label>
                </div>
                <div className="col-md-3 form-check form-switch ms-3">
                  <input className="form-check-input" type="checkbox" checked={meta.hasSystem} onChange={(e) => setMeta({...meta, hasSystem: e.target.checked})} />
                  <label className="form-check-label">PC System</label>
                </div>
                <div className="col-md-3 form-check form-switch ms-3">
                  <input className="form-check-input" type="checkbox" checked={meta.isCabin} onChange={(e) => setMeta({...meta, isCabin: e.target.checked})} />
                  <label className="form-check-label">Is Cabin</label>
                </div>
                <div className="col-md-4 mt-3">
                  <label>Lighting Type</label>
                  <select className="form-select form-select-sm" value={meta.lighting} onChange={(e) => setMeta({...meta, lighting: e.target.value})}>
                    <option value="bright">Bright (Work)</option>
                    <option value="warm">Warm (Cozy)</option>
                    <option value="dim">Dim (Presentation)</option>
                  </select>
                </div>
              </div>

              <h6 className="mt-4 border-bottom pb-2">{type === 1 ? 'Desk Features' : 'Meeting Room Features'}</h6>
              <div className="row g-3 mt-1">
                {type === 1 ? (
                  <div className="col-md-4 form-check form-switch ms-3">
                    <input className="form-check-input" type="checkbox" checked={meta.chargingSlot} onChange={(e) => setMeta({...meta, chargingSlot: e.target.checked})} />
                    <label className="form-check-label">Charging Slot</label>
                  </div>
                ) : (
                  <>
                    <div className="col-md-3">
                        <label className="small">Capacity</label>
                        <input type="number" className="form-control form-control-sm" value={meta.capacity} onChange={(e) => setMeta({...meta, capacity: e.target.value})} />
                    </div>
                    <div className="col-md-3 form-check form-switch mt-4 ms-3">
                      <input className="form-check-input" type="checkbox" checked={meta.projector} onChange={(e) => setMeta({...meta, projector: e.target.checked})} />
                      <label className="form-check-label">Projector</label>
                    </div>
                    <div className="col-md-3 form-check form-switch mt-4 ms-3">
                      <input className="form-check-input" type="checkbox" checked={meta.mic} onChange={(e) => setMeta({...meta, mic: e.target.checked})} />
                      <label className="form-check-label">Microphone</label>
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onHide}>Close</button>
              <button type="submit" className="btn btn-success">Save Resource</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}