import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchPlans } from "../../redux/slices/subscriptionSlice";
import { updatePlanApi } from "../../redux/api/subscriptionApi";

export default function EditPlanModal({ plan, onClose }) {
  const dispatch = useDispatch();
  const [form, setForm] = useState({ ...plan });

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await updatePlanApi(form.id, form);
    await dispatch(fetchPlans()).unwrap();
    onClose();
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
                    name="deskLimit"
                    value={form.deskLimit}
                    onChange={onChange}
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">Employee Limit</label>
                  <input
                    type="number"
                    className="form-control"
                    name="employeeLimit"
                    value={form.employeeLimit}
                    onChange={onChange}
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">Floor Limit</label>
                  <input
                    type="number"
                    className="form-control"
                    name="floorLimit"
                    value={form.floorLimit}
                    onChange={onChange}
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">Meeting Room Limit</label>
                  <input
                    type="number"
                    className="form-control"
                    name="meetingRoomLimit"
                    value={form.meetingRoomLimit}
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

              </div>
            </div>

            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onClose}>
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
