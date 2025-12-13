import React from "react";
import { useDispatch } from "react-redux";
import { fetchPlans } from "../../redux/slices/subscriptionSlice";
import { deletePlanApi } from "../../redux/api/subscriptionApi";

export default function DeleteConfirmModal({ plan, onClose }) {
  const dispatch = useDispatch();

  const onDelete = async () => {
    await deletePlanApi(plan.id);
    await dispatch(fetchPlans()).unwrap();
    onClose();
  };

  return (
    <div className="modal d-block" style={{ background: "rgba(0,0,0,.5)" }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5>Confirm Delete</h5>
            <button className="btn-close" onClick={onClose} />
          </div>

          <div className="modal-body">
            Are you sure you want to delete
            <strong> {plan.subscriptionName}</strong>?
          </div>

          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button className="btn btn-danger" onClick={onDelete}>
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
