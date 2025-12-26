import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createPlan,
  fetchPlans,
  fetchPlanTypes
} from "../../redux/slices/subscriptionSlice";

const initialState = {
  subscriptionName: "",
  employeeLimit: 0,
  floorLimit: 0,
  deskLimit: 0,
  meetingRoomLimit: 0,
  priceMonthly: 0,
  priceYearly: 0,
  description: "",
  typeId: ""
};

export default function AddPlanModal({ onClose }) {
  const dispatch = useDispatch();
  const [form, setForm] = useState(initialState);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    dispatch(fetchPlanTypes());
  }, [dispatch]);

  const { types, loading, error } = useSelector(
    (state) => state.subscription
  );

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError("");

    const payload = {
      subscriptionName: form.subscriptionName,
      employeeLimit: Number(form.maxEmployees),
      floorLimit: Number(form.maxFloors),
      deskLimit: Number(form.maxDesks),
      meetingRoomLimit: Number(form.maxMeetingRooms),
      priceMonthly: Number(form.priceMonthly),
      priceYearly: Number(form.priceYearly),
      description: form.description,
      typeId: Number(form.typeId)
    };

    console.log("Creating plan payload:", payload);

    const res = await dispatch(createPlan(payload));

    if (!res.error) {
      dispatch(fetchPlans());
      onClose();
    } else {
      setSubmitError(res.error.message || "Failed to create plan");
    }

    setSubmitting(false);
  };

  return (
    <div className="modal d-block" style={{ background: "rgba(0,0,0,.5)" }}>
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <form onSubmit={onSubmit}>
            <div className="modal-header">
              <h5>Add Subscription Plan</h5>
              <button type="button" className="btn-close" onClick={onClose} />
            </div>

            <div className="modal-body row g-2">

              {/* 🔄 Loading state */}
              {loading && (
                <div className="alert alert-info">
                  Loading plan types...
                </div>
              )}

              {/* ❌ Error state */}
              {error && (
                <div className="alert alert-danger">
                  {error}
                </div>
              )}

              {submitError && (
                <div className="alert alert-danger">
                  {submitError}
                </div>
              )}

              <input
                className="form-control"
                name="subscriptionName"
                placeholder="Plan Name"
                onChange={onChange}
                required
                disabled={loading}
              />

              <input
                className="form-control"
                name="priceMonthly"
                type="number"
                placeholder="Monthly Price"
                onChange={onChange}
                disabled={loading}
              />

              <input
                className="form-control"
                name="priceYearly"
                type="number"
                placeholder="Yearly Price"
                onChange={onChange}
                disabled={loading}
              />

              <input
                className="form-control"
                name="maxDesks"
                type="number"
                placeholder="Desk Limit"
                onChange={onChange}
                disabled={loading}
              />

              <input
                className="form-control"
                name="maxEmployees"
                type="number"
                placeholder="Employee Limit"
                onChange={onChange}
                disabled={loading}
              />

              <input
                className="form-control"
                name="maxFloors"
                type="number"
                placeholder="Floor Limit"
                onChange={onChange}
                disabled={loading}
              />

              <input
                className="form-control"
                name="maxMeetingRooms"
                type="number"
                placeholder="Meeting Room Limit"
                onChange={onChange}
                disabled={loading}
              />

              <select
                className="form-control"
                name="typeId"
                value={form.typeId}
                onChange={onChange}
                required
                disabled={loading}
              >
                <option value="">Select Type</option>
                {types.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.typeName}
                  </option>
                ))}
              </select>

              <textarea
                className="form-control"
                name="description"
                placeholder="Description"
                onChange={onChange}
                disabled={loading}
              />
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onClose}
                disabled={submitting}
              >
                Cancel
              </button>
              <button
                className="btn btn-primary"
                disabled={submitting || loading}
              >
                {submitting ? "Saving..." : "Save"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
