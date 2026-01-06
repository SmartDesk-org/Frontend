import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFloors, setActiveFloor } from "../../redux/slices/floorSlice";
import { fetchResourcesByFloor } from "../../redux/slices/resourceSlice";
import ResourceDraggable from "../../components/companyAdmin/ResourceDraggable";
import CreateFloorForm from "../../components/companyAdmin/CreateFloorForm";
import CreateResourceForm from "../../components/companyAdmin/CreateResourceForm";
import "../../styles/layout.css";

export default function FloorLayoutPage() {
  const dispatch = useDispatch();
  const [showFloorModal, setShowFloorModal] = useState(false);
  const [showResourceModal, setShowResourceModal] = useState(false);

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

  const deskCount = resources.filter((r) => r.resourceTypeId === 1).length;
  const roomCount = resources.filter((r) => r.resourceTypeId === 2).length;

  return (
    <div className="container-fluid py-3">

      {/* ✅ SINGLE PAGE WRAPPER */}
      <div className="card shadow-sm border-0">
        <div className="card-body">

          {/* ===== PAGE HEADER ===== */}
          <div className="d-flex justify-content-between align-items-start mb-4 flex-wrap gap-3">
            <div>
              <h4 className="fw-bold mb-0">Smart Workspace Designer</h4>
              <p className="text-muted small mb-0">
                Visual layout management for your office floors
              </p>
            </div>

            <div className="d-flex align-items-center gap-3 flex-wrap">
              <div className="btn-group shadow-sm">
                {floors.map((f) => (
                  <button
                    key={f.floorId}
                    className={`btn btn-sm ${
                      activeFloor?.floorId === f.floorId
                        ? "btn-dark"
                        : "btn-outline-dark"
                    }`}
                    onClick={() => dispatch(setActiveFloor(f))}
                  >
                    {f.floorName}
                  </button>
                ))}
              </div>

              <div className="alert alert-info border-0 py-2 px-3 small mb-0">
                <i className="bi bi-lightbulb me-2"></i>
                Drag items to reposition. Click items to view metadata.
              </div>
            </div>
          </div>

          {/* ===== MAIN CONTENT ===== */}
          <div className="row g-3">

            {/* LEFT — CANVAS */}
            <div className="col-md-9">
              <div className="card shadow-sm border-0 h-100">
                <div
                  className="card-body bg-light rounded d-flex justify-content-center overflow-auto"
                  style={{ minHeight: "600px" }}
                >
                  <div
                    className="floor-canvas border rounded shadow-sm position-relative bg-white"
                    style={{ width: 900, height: 400 }}
                  >
                    {loading ? (
                      <div className="h-100 d-flex align-items-center justify-content-center text-muted">
                        <div className="spinner-border spinner-border-sm me-2"></div>
                        Syncing layout...
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

            {/* RIGHT — ACTIONS + STATS */}
            <div className="col-md-3">
              <div className="card shadow-sm border-0 h-100">
                <div className="card-body">

                  {/* MANAGEMENT */}
                  <h6 className="fw-bold mb-3">Management</h6>
                  <div className="d-grid gap-2 mb-4">
                    <button
                      className="btn btn-primary fw-bold shadow-sm"
                      onClick={() => setShowResourceModal(true)}
                      disabled={!activeFloor}
                    >
                      <i className="bi bi-plus-circle me-2"></i>
                      Register Resource
                    </button>

                    <button
                      className="btn btn-outline-primary btn-sm fw-bold"
                      onClick={() => setShowFloorModal(true)}
                    >
                      <i className="bi bi-layers me-2"></i>
                      Add New Floor
                    </button>
                  </div>

                  <hr />

                  {/* LEGEND */}
                  <h6 className="fw-bold mb-3">Status Legend</h6>
                  <div className="d-flex align-items-center mb-2">
                    <div
                      className="rounded me-2"
                      style={{ width: 20, height: 20, background: "#28a745" }}
                    />
                    <span className="small">Available</span>
                  </div>

                  <div className="d-flex align-items-center mb-4">
                    <div
                      className="rounded me-2"
                      style={{ width: 20, height: 20, background: "#dc3545" }}
                    />
                    <span className="small">Occupied / Reserved</span>
                  </div>

                  <hr />

                  {/* STATS */}
                  <h6 className="fw-bold mb-3">Floor Statistics</h6>

                  <div className="p-3 bg-light rounded border mb-2">
                    <div className="d-flex justify-content-between">
                      <span className="small text-muted">Total Desks</span>
                      <span className="badge bg-primary rounded-pill">
                        {deskCount}
                      </span>
                    </div>
                  </div>

                  <div className="p-3 bg-light rounded border">
                    <div className="d-flex justify-content-between">
                      <span className="small text-muted">Meeting Rooms</span>
                      <span className="badge bg-success rounded-pill">
                        {roomCount}
                      </span>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MODALS */}
      <CreateFloorForm
        show={showFloorModal}
        onHide={() => setShowFloorModal(false)}
      />

      {activeFloor && (
        <CreateResourceForm
          floorId={activeFloor.floorId}
          show={showResourceModal}
          onHide={() => setShowResourceModal(false)}
        />
      )}
    </div>
  );
}
