import React, { useRef, useState } from "react";
import Draggable from "react-draggable";
import { useDispatch } from "react-redux";
import { updateResourcePosition, deleteResource } from "../../redux/slices/resourceSlice";

export default function ResourceDraggable({ resource, isAdmin }) {
  const dispatch = useDispatch();
  const nodeRef = useRef(null);
  const [showPopup, setShowPopup] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const meta = JSON.parse(resource.metadataJson || "{}");
  const isDesk = resource.resourceTypeId === 1;

  const handleStop = (e, data) => {
    if (data.x !== resource.x || data.y !== resource.y) {
      dispatch(updateResourcePosition({
        resourceId: resource.id,
        x: Math.round(data.x),
        y: Math.round(data.y),
        width: resource.width,
        height: resource.height,
        rotation: resource.rotation,
      }));
    }
  };

  const handleConfirmDelete = (e) => {
    e.stopPropagation();
    setShowConfirm(true);
  };

  const executeDelete = () => {
    dispatch(deleteResource(resource.id));
    setShowConfirm(false);
    setShowPopup(false);
  };

  return (
    <>
      <Draggable
        nodeRef={nodeRef}
        bounds="parent"
        position={{ x: resource.x, y: resource.y }}
        disabled={!isAdmin}
        onStop={handleStop}
        grid={[5, 5]}
      >
        <div
          ref={nodeRef}
          onMouseEnter={() => setShowPopup(!showPopup)}
          onMouseLeave={() => setShowPopup(!showPopup)}
          className={`resource-box shadow-sm ${resource.isAvailable ? "available" : "occupied"}`}
          style={{
            width: resource.width,
            height: resource.height,
            transform: `rotate(${resource.rotation}deg)`,
            zIndex: showPopup ? 100 : 10,
            cursor: 'pointer',
            position: 'absolute'
          }}
        >
          {/* Resource Name Label */}
          <div className="fw-bold small text-center px-1" style={{ fontSize: '11px', marginTop: '2px' }}>
            {meta.name || "N/A"}
          </div>

          {/* Quick Feature Icons on the box */}
          <div className="feature-icons-mini">
            {meta.hasAC && <i className="bi bi-snow" title="AC"></i>}
            {meta.hasSystem && <i className="bi bi-pc-display" title="PC"></i>}
            {isDesk && meta.chargingSlot && <i className="bi bi-lightning-charge" title="Charging"></i>}
            {!isDesk && meta.projector && <i className="bi bi-projector" title="Projector"></i>}
          </div>

          {/* Detailed Info Popup */}
          {showPopup && (
            <div className="resource-details-popup text-start shadow-lg border p-0" 
                 style={{ top: '105%', left: '0', minWidth: '220px' }}
                 onClick={(e) => e.stopPropagation()}
            >
              <header className="bg-light p-2 d-flex justify-content-between align-items-center border-bottom">
                <span className="fw-bold small">{meta.name}</span>
                <span className={`badge ${resource.isAvailable ? "bg-success" : "bg-danger"}`} style={{fontSize: '9px'}}>
                    {resource.isAvailable ? "Available" : "Occupied"}
                </span>
              </header>

              <div className="p-3">
                <div className="row g-2 small mb-3">
                  <div className="col-6"><i className="bi bi-snow me-1"></i> AC: {meta.hasAC ? 'Yes' : 'No'}</div>
                  <div className="col-6"><i className="bi bi-pc-display me-1"></i> Sys: {meta.hasSystem ? 'Yes' : 'No'}</div>
                  <div className="col-6"><i className="bi bi-door-closed me-1"></i> Cabin: {meta.isCabin ? 'Yes' : 'No'}</div>
                  <div className="col-6"><i className="bi bi-lightbulb me-1"></i> {meta.lighting}</div>
                  
                  {isDesk ? (
                    <div className="col-12 text-primary border-top pt-1 mt-1">
                        <i className="bi bi-lightning-charge me-1"></i> Charging: {meta.chargingSlot ? 'Yes' : 'No'}
                    </div>
                  ) : (
                    <div className="col-12 border-top pt-1 mt-1">
                        <div className="d-flex justify-content-between">
                            <span>👥 Cap: {meta.capacity}</span>
                            <span>📽️ Proj: {meta.projector ? 'Yes' : 'No'}</span>
                        </div>
                        <div className="mt-1">🎙️ Mic: {meta.mic ? 'Yes' : 'No'}</div>
                    </div>
                  )}
                </div>

                {/* The Action Buttons inside Popup */}
                <div className="d-flex gap-1 border-top pt-2">
                    <button className="btn btn-danger btn-sm flex-grow-1 py-0" onClick={handleConfirmDelete}>
                        <i className="bi bi-trash"></i> Delete
                    </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </Draggable>

      {/* Separate Confirmation Modal */}
      {showConfirm && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.7)', zIndex: 9999 }}>
          <div className="modal-dialog modal-sm modal-dialog-centered">
            <div className="modal-content border-0 shadow-lg">
              <div className="modal-body text-center p-4">
                <div className="text-danger mb-3">
                    <i className="bi bi-exclamation-octagon" style={{ fontSize: '2.5rem' }}></i>
                </div>
                <h5 className="fw-bold">Are you sure?</h5>
                <p className="text-muted small">This will permanently delete <strong>{meta.name}</strong> from the floor plan.</p>
                <div className="d-grid gap-2 mt-4">
                  <button className="btn btn-danger" onClick={executeDelete}>Yes, Delete it</button>
                  <button className="btn btn-light" onClick={() => setShowConfirm(false)}>Cancel</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}