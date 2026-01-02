import React, { useRef } from "react";
import Draggable from "react-draggable";
import { useDispatch } from "react-redux";
import { updateResourcePosition } from "../../redux/slices/resourceSlice";

export default function ResourceDraggable({ resource, isAdmin }) {
  const dispatch = useDispatch();
  const nodeRef = useRef(null);

  const handleStop = (e, data) => {
    if (data.x !== resource.x || data.y !== resource.y) {
      dispatch(
        updateResourcePosition({
          resourceId: resource.id,
          x: Math.round(data.x),
          y: Math.round(data.y),
          width: resource.width,
          height: resource.height,
          rotation: resource.rotation,
        })
      );
    }
  };

  const metadata = JSON.parse(resource.metadataJson || "{}");
  const isDesk = resource.resourceTypeId === 1;

  return (
    <Draggable
      nodeRef={nodeRef}
      bounds="parent"
      position={{ x: resource.x, y: resource.y }}
      disabled={!isAdmin}
      onStop={handleStop}
      grid={[10, 10]}
    >
      <div
        ref={nodeRef}
        className={`resource-box shadow-sm ${
          isDesk ? "desk" : "meeting-room"
        } ${!resource.isAvailable ? "occupied" : ""}`}
        style={{
          width: resource.width,
          height: resource.height,
          transform: `rotate(${resource.rotation}deg)`,
          zIndex: isDesk ? 10 : 5,
        }}
        title={metadata.name}
      >
        <div className="resource-label fw-semibold small text-center">
          {metadata.name || (isDesk ? "Desk" : "Room")}
        </div>
      </div>
    </Draggable>
  );
}
