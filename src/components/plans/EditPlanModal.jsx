import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchPlans } from "../../redux/slices/subscriptionSlice";
import { updatePlanApi } from "../../redux/api/subscriptionApi";

export default function EditPlanModal({ plan, onClose }) {
  const dispatch = useDispatch();

  // ✅ DTO-aligned state (minimal explicit mapping)
  const [form, setForm] = useState({
    subscriptionName: plan.subscriptionName,
    maxEmployees: plan.maxEmployees,
    maxFloors: plan.maxFloors,
    maxDesks: plan.maxDesks,
    maxMeetingRooms: plan.maxMeetingRooms,
    priceMonthly: plan.priceMonthly,
    priceYearly: plan.priceYearly,
    description: plan.description,
    typeId: plan.typeId
  });

  // 🔍 Log initial state
  useEffect(() => {
    console.log("🟡 EditPlanModal opened with plan:", plan);
    console.log("🟡 Initial form state:", form);
  }, []);

  // ✅ Numeric safety
  const onChange = (e) => {
    const { name, value, type } = e.target;

    console.log("✏️ Field changed:", {
      field: name,
      value: type === "number" ? Number(value) : value
    });

    setForm({
      ...form,
      [name]: type === "number" ? Number(value) : value
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    console.log("🚀 Submitting update for planId:", plan.id);
    console.log("📦 Payload sent to API:", form);

    try {
      await updatePlanApi(plan.id, form);
      console.log("✅ Plan updated successfully");

      await dispatch(fetchPlans()).unwrap();
      console.log("🔄 Plans list refreshed");

      onClose();
    } catch (err) {
      console.error("❌ Failed to update plan:", err);
    }
  };

  return (
    <div className="modal d-block" style={{ background: "rgba(0,0,0,.5)" }}>
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <form onSubmit={onSubmit}>
            <div className="modal-header">
              <h5>Edit Subscription Plan</h5>
              <button type="button" className="btn-close" onClick={onClose} />
            </div>

            <div className="modal-body">
              <div className="row g-3">

                <div className="col-md-6">
                  <label className="form-label">Plan Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="subscriptionName"
                    value={form.subscriptionName}
                    onChange={onChange}
                    required
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">Monthly Price</label>
                  <input
                    type="number"
                    className="form-control"
                    name="priceMonthly"
                    value={form.priceMonthly}
                    onChange={onChange}
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">Yearly Price</label>
                  <input
                    type="number"
                    className="form-control"
                    name="priceYearly"
                    value={form.priceYearly}
                    onChange={onChange}
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">Desk Limit</label>
                  <input
                    type="number"
                    className="form-control"
                    name="maxDesks"
                    value={form.maxDesks}
                    onChange={onChange}
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">Employee Limit</label>
                  <input
                    type="number"
                    className="form-control"
                    name="maxEmployees"
                    value={form.maxEmployees}
                    onChange={onChange}
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">Floor Limit</label>
                  <input
                    type="number"
                    className="form-control"
                    name="maxFloors"
                    value={form.maxFloors}
                    onChange={onChange}
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">Meeting Room Limit</label>
                  <input
                    type="number"
                    className="form-control"
                    name="maxMeetingRooms"
                    value={form.maxMeetingRooms}
                    onChange={onChange}
                  />
                </div>

                <div className="col-md-12">
                  <label className="form-label">Description</label>
                  <textarea
                    className="form-control"
                    name="description"
                    rows="3"
                    value={form.description}
                    onChange={onChange}
                  />
                </div>

                {/* Required for backend */}
                <input type="hidden" name="typeId" value={form.typeId} />

              </div>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onClose}
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-warning">
                Update
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}
