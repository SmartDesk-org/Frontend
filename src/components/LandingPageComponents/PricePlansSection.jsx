import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPlans } from "../../redux/slices/subscriptionSlice";
import { useNavigate } from "react-router-dom";

export default function PricePlansSection() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { plans, loading, error } = useSelector((state) => state.subscription);

  useEffect(() => {
    dispatch(fetchPlans());
  }, [dispatch]);

  if (loading) return <p className="text-center">Loading plans...</p>;
  if (error) return <p className="text-center text-danger">{error}</p>;

  const activePlans = plans?.filter((p) => p.isActive);

  if (!activePlans?.length)
    return <p className="text-center">No plans available</p>;

  const choosePlan = (plan) => {
    navigate("/purchase", { state: { selectedPlan: plan } });
  };

  return (
    <section className="py-5 bg-light">
      <div className="container text-center">
        <h3 className="fw-bold mb-4">Pricing Plans</h3>

        <div className="d-flex flex-wrap justify-content-center gap-4">
          {activePlans.map((plan) => (
            <div
              key={plan.id}
              className="card p-4 shadow"
              style={{ width: 360 }}
            >
              <h4>{plan.subscriptionName}</h4>

              <p className="fs-3 fw-bold">
                ₹{plan.priceMonthly}/mo
                <br />
                <span className="fs-6">(₹{plan.priceYearly}/year)</span>
              </p>

              <ul className="text-start">
                {(plan.description || "").split(",").map((f, i) => (
                  <li key={i}>✔ {f.trim()}</li>
                ))}
              </ul>

              <button
                className="btn btn-primary w-100 mt-3"
                onClick={() => choosePlan(plan)}
              >
                Choose Plan
              </button>
            </div>
          ))}
        </div>

        {/* ✅ Added text below plans */}
        <p className="mt-4 text-muted">
          Need a custom plan?{" "}
          <a
            className="nav-link text-dark text-primary text-decoration-underline"
            href="#book-demo"
          >
            Contact the admins
          </a>
        </p>
      </div>
    </section>
  );
}
