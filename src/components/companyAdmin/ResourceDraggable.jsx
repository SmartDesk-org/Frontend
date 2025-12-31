import React, { useRef } from "react";
import Draggable from "react-draggable";
import { useDispatch } from "react-redux";
import {
  updateResourcePosition,
} from "../../redux/slices/resourceSlice";

export default function ResourceDraggable({ resource, isAdmin }) {
  const dispatch = useDispatch();
  const nodeRef = useRef(null);

  return (
    <Draggable
      nodeRef={nodeRef}
      position={{ x: resource.x, y: resource.y }}
      disabled={!isAdmin}
      onStop={(e, data) =>
        dispatch(
          updateResourcePosition({
            resourceId: resource.id,
            x: data.x,
            y: data.y,
          })
        )
      }
    >
      <div
        ref={nodeRef}
        className={`resource-box ${
          resource.isAvailable ? "available" : "occupied"
        }`}
        style={{
          width: resource.width,
          height: resource.height,
          transform: `rotate(${resource.rotation}deg)`,
        }}
      >
        {resource.resourceTypeId === 1
          ? "Desk"
          : "Meeting Room"}
      </div>
    </Draggable>
  );
}
