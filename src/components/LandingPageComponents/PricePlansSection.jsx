import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPlans } from "../../redux/slices/subscriptionSlice";

export default function PricePlansSection() {
  const dispatch = useDispatch();
  const { plans, loading, error } = useSelector((state) => state.subscription);

  useEffect(() => {
    dispatch(fetchPlans());
  }, [dispatch]);

  if (loading) return <p className="text-center">Loading plans...</p>;
  if (error) return <p className="text-center text-danger">{error}</p>;
  if (!plans || !plans.length)
    return <p className="text-center">No plans available</p>;

  return (
    <section className="py-5 px-3 bg-light">
      <div className="container text-center">
        <h3 className="fw-bold text-dark mb-4 fs-2">Pricing Plans</h3>

        <div className="d-flex flex-column flex-md-row justify-content-center gap-4 flex-wrap">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className="bg-white rounded shadow p-4"
              style={{ maxWidth: "380px", width: "100%" }}
            >
              {/* Plan Title */}
              <h4 className="fs-4 fw-semibold mb-3">
                {plan.subscriptionName}
              </h4>

              {/* Pricing */}
              <p className="fs-2 fw-bold mb-4">
                ₹{plan.priceMonthly}/mo  
                <br />
                <span className="fs-6 text-muted">(₹{plan.priceYearly}/year)</span>
              </p>

              {/* Description */}
              <h6 className="fw-bold text-start">Features:</h6>
              <ul className="text-muted mb-4 text-start" style={{ lineHeight: "1.9" }}>
                {(plan.description || "")
                  .split(",")
                  .map((item, index) => (
                    <li key={index}>✔ {item.trim()}</li>
                  ))}
              </ul>

              {/* Limits */}
              <h6 className="fw-bold text-start mt-3">Usage Limits:</h6>
              <ul className="text-muted mb-4 text-start">
                <li>Desk Limit: {plan.deskLimit}</li>
                <li>Employee Limit: {plan.employeeLimit}</li>
                <li>Floor Limit: {plan.floorLimit}</li>
                <li>Meeting Room Limit: {plan.meetingRoomLimit}</li>
              </ul>

              {/* Button */}
              <button className="btn btn-primary w-100">
                Choose Plan
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
