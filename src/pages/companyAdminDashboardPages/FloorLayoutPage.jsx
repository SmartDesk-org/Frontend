import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchFloors,
  setActiveFloor,
} from "../../redux/slices/floorSlice";
import { fetchResourcesByFloor } from "../../redux/slices/resourceSlice";

import FloorsTopNav from "../../components/FloorsTopNav";
import ResourceDraggable from "../../components/companyAdmin/ResourceDraggable";

export default function FloorLayoutPage() {
  const dispatch = useDispatch();

  const { floors, activeFloor, loading: loadingFloors } =
    useSelector((s) => s.floor);

  const { resources, loading: loadingResources } =
    useSelector((s) => s.resources);

  /* Fetch floors on mount */
  useEffect(() => {
    dispatch(fetchFloors());
  }, [dispatch]);

  /* Set first floor as active when floors load */
  useEffect(() => {
    if (floors.length > 0 && !activeFloor) {
      dispatch(setActiveFloor(floors[0]));
    }
  }, [floors, activeFloor, dispatch]);

  /* Fetch resources when active floor changes */
  useEffect(() => {
    if (activeFloor?.floorId) {
      dispatch(fetchResourcesByFloor(activeFloor.floorId));
    }
  }, [activeFloor, dispatch]);

  if (loadingFloors) return <p>Loading floors...</p>;

  if (!loadingFloors && floors.length === 0) {
    return <p>No floors available.</p>;
  }

  return (
    <div>
      {/* TOP NAV */}
      <FloorsTopNav
        floors={floors}
        activeFloorId={activeFloor?.floorId}
        onSelect={(floor) => dispatch(setActiveFloor(floor))}
      />

      <div className="layout">
        {/* SIDE PANEL */}
        <aside className="resource-panel">
          {loadingResources ? (
            "Loading resources..."
          ) : resources.length === 0 ? (
            <p>No resources found.</p>
          ) : (
            resources.map((r) => (
              <div key={r.id}>{r.name}</div>
            ))
          )}
        </aside>

        {/* FLOOR CANVAS */}
        <div
          className="floor-canvas"
          style={{
            width: activeFloor?.width,
            height: activeFloor?.height,
          }}
        >
          {resources.length === 0 ? (
            <p className="empty-canvas">
              No resources on this floor
            </p>
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
  );
}
