import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPlan, fetchPlans, fetchPlanTypes } from "../../redux/slices/subscriptionSlice";

const initialState = {
  subscriptionName: "",
  employeeLimit: 0,
  floorLimit: 0,
  deskLimit: 0,
  meetingRoomLimit: 0,
  priceMonthly: 0,
  priceYearly: 0,
  description: "",
  typeId:""
};

export default function AddPlanModal({ onClose }) {
  const dispatch = useDispatch();
  const [form, setForm] = useState(initialState);
  const [submitting, setSubmitting] = useState(false);

  useEffect(()=>{
    dispatch(fetchPlanTypes());
  },[dispatch])

  const {types,loading,error} =useSelector(state=>state.subscription);

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const payload = {
    subscriptionName: form.subscriptionName,
    employeeLimit: Number(form.employeeLimit),
    floorLimit: Number(form.floorLimit),
    deskLimit: Number(form.deskLimit),
    meetingRoomLimit: Number(form.meetingRoomLimit),
    priceMonthly: Number(form.priceMonthly),
    priceYearly: Number(form.priceYearly),
    description: form.description,
    typeId:Number(form.typeId)
  };
    console.log("Creating plan payload:", payload);

    const res = await dispatch(createPlan(payload));

    if (!res.error) {
      dispatch(fetchPlans());
      onClose();
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
              <input className="form-control" name="subscriptionName" placeholder="Plan Name" onChange={onChange} required />

              <input className="form-control" name="priceMonthly" type="number" placeholder="Monthly Price" onChange={onChange} />
              <input className="form-control" name="priceYearly" type="number" placeholder="Yearly Price" onChange={onChange} />

              <input className="form-control" name="deskLimit" type="number" placeholder="Desk Limit" onChange={onChange} />
              <input className="form-control" name="employeeLimit" type="number" placeholder="Employee Limit" onChange={onChange} />
              <input className="form-control" name="floorLimit" type="number" placeholder="Floor Limit" onChange={onChange} />
              <input className="form-control" name="meetingRoomLimit" type="number" placeholder="Meeting Room Limit" onChange={onChange} />
              <select 
                className="form-control"
                name="typeId"
                value={form.typeId}
                onChange={onChange}
                required
              >
                <option value="" >Select Type</option>
                {types.map(item=>
                  <option key={item.id} value={item.id}>{item.name}</option>
                )}
              </select>
              <textarea className="form-control" name="description" placeholder="Description" onChange={onChange} />
            </div>

            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={onClose}>
                Cancel
              </button>
              <button className="btn btn-primary" disabled={submitting}>
                {submitting ? "Saving..." : "Save"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
