import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFloors, setActiveFloor } from "../../redux/slices/floorSlice";
import { fetchResourcesByFloor } from "../../redux/slices/resourceSlice";
import ResourceDraggable from "../../components/companyAdmin/ResourceDraggable";
import CreateFloorForm from "../../components/companyAdmin/CreateFloorForm"; // Import the modal form
import "../../styles/layout.css";

export default function FloorLayoutPage() {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false); // State to control modal

  const { floors, activeFloor } = useSelector((s) => s.floor);
  const { resources, loading } = useSelector((s) => s.resources);

  useEffect(() => {
    dispatch(fetchFloors());
  }, [dispatch]);

  useEffect(() => {
    if (activeFloor?.floorId) {
      dispatch(fetchResourcesByFloor(activeFloor.floorId));
    }
  }, [activeFloor, dispatch]);

  return (
    <div className="container-fluid py-3">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h4 className="fw-bold mb-0">Floor Layout Designer</h4>
          <small className="text-muted">Manage your office workspace visually</small>
        </div>
        
        <div className="d-flex gap-3 align-items-center">
          <div className="d-flex gap-2 flex-wrap border-end pe-3">
            {floors.map((f) => (
              <button
                key={f.floorId}
                className={`btn btn-sm ${
                  activeFloor?.floorId === f.floorId
                    ? "btn-dark shadow-sm"
                    : "btn-outline-dark"
                }`}
                onClick={() => dispatch(setActiveFloor(f))}
              >
                {f.floorName}
              </button>
            ))}
          </div>
          {/* ✅ Button to open Modal */}
          <button 
            className="btn btn-primary btn-sm fw-bold" 
            onClick={() => setShowModal(true)}
          >
            + Add Floor
          </button>
        </div>
      </div>

      <div className="row g-3">
        {/* LEFT: Canvas */}
        <div className="col-md-9">
          <div className="card shadow-sm border-0 h-100">
            <div className="card-body p-4 d-flex justify-content-center bg-light rounded">
              <div
                className="floor-canvas border rounded bg-white position-relative shadow-inner"
                style={{
                  width: 800,
                  height: 400,
                }}
              >
                {loading ? (
                  <div className="h-100 d-flex align-items-center justify-content-center text-muted">
                    <div className="spinner-border spinner-border-sm me-2"></div>
                    Loading Resources...
                  </div>
                ) : (
                  resources.map((r) => (
                    <ResourceDraggable
                      key={r.id}
                      resource={r}
                      isAdmin={true}
                    />
                  ))
                )}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: Legend & Stats */}
        <div className="col-md-3">
          <div className="card shadow-sm border-0 h-100">
            <div className="card-body">
              <h6 className="fw-bold mb-3">Floor Details</h6>
              <div className="p-3 bg-light rounded mb-3">
                <div className="small text-muted mb-1">Active Floor:</div>
                <div className="fw-bold text-primary">{activeFloor?.floorName || "None"}</div>
              </div>
              
              <h6 className="fw-bold small text-uppercase text-muted mt-4">Statistics</h6>
              <hr className="mt-1" />

              <div className="d-flex justify-content-between mb-2">
                <span><span className="badge bg-primary me-2">&nbsp;</span> Desks</span>
                <span className="fw-bold">{resources.filter((r) => r.resourceTypeId === 1).length}</span>
              </div>

              <div className="d-flex justify-content-between mb-4">
                <span><span className="badge bg-success me-2">&nbsp;</span> Rooms</span>
                <span className="fw-bold">{resources.filter((r) => r.resourceTypeId === 2).length}</span>
              </div>

              <div className="alert alert-warning border-0 small mb-0">
                <i className="bi bi-info-circle me-1"></i>
                Drag resources to reposition. Changes are saved instantly.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ✅ The Modal Component */}
      <CreateFloorForm 
        show={showModal} 
        onHide={() => setShowModal(false)} 
      />
    </div>
  );
}