import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  updatePurchaseField,
  submitPurchase,
} from "../redux/slices/purchaseSubscriptionSlice";

export default function PurchaseSubscriptionPage() {
  const { state } = useLocation();
  const plan = state?.selectedPlan;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const purchaseState = useSelector((state) => state.purchase);
  const { form, loading, error, success, companyId } = purchaseState;

  // ✅ New local UX state
  const [isYearly, setIsYearly] = useState(true);

  useEffect(() => {
    if (success && companyId) {
      navigate("/payment", { state: { companyId } });
    }
  }, [success, companyId, navigate]);

  if (!plan) return <p className="text-center">No plan selected</p>;

  const handleChange = (e) => {
    dispatch(
      updatePurchaseField({
        name: e.target.name,
        value: e.target.value,
      })
    );
  };

  // ✅ Amount calculation
  const totalAmount = isYearly
    ? plan.priceYearly
    : Number(form.months) * plan.priceMonthly;

  // ✅ Expiration calculation
  const startDate = new Date();
  const expirationDate = new Date(startDate);

  if (isYearly) {
    expirationDate.setFullYear(startDate.getFullYear() + 1);
  } else {
    expirationDate.setMonth(
      startDate.getMonth() + Number(form.months)
    );
  }

  const submitCompany = () => {
  if (!form.password || !form.confirmPassword) {
    alert("Password and Confirm Password are required");
    return;
  }

  if (form.password !== form.confirmPassword) {
    alert("Password and Confirm Password do not match");
    return;
  }

  if (!isYearly && Number(form.months) < 1) {
    alert("Please select at least 1 month");
    return;
  }

  const payload = {
    name: form.name,
    address: form.address,
    email: form.email,
    passWord: form.password,
    confirmPassword: form.confirmPassword,

    selectedSubscriptionId: plan.id,
    expirationMonth: isYearly ? 0 : Number(form.months),
    expirationYear: isYearly ? 1 : 0,
  };

  dispatch(submitPurchase(payload));
};


  return (
    <div className="container py-5">
      <h3 className="fw-bold mb-4">Purchase Subscription</h3>

      {/* Company Details */}
      <div className="card p-4 mb-4">
        <h5>Company Details</h5>

        <input
          className="form-control mb-2"
          placeholder="Company Name"
          name="name"
          value={form.name}
          onChange={handleChange}
        />

        <input
          className="form-control mb-2"
          placeholder="Address"
          name="address"
          value={form.address}
          onChange={handleChange}
        />

        <input
          className="form-control mb-2"
          placeholder="Email"
          name="email"
          value={form.email}
          onChange={handleChange}
        />

        <input
          type="password"
          className="form-control mb-2"
          placeholder="Password"
          name="password"
          value={form.password}
          onChange={handleChange}
        />

        <input
          type="password"
          className="form-control mb-2"
          placeholder="Confirm Password"
          name="confirmPassword"
          value={form.confirmPassword}
          onChange={handleChange}
        />
      </div>

      {/* Selected Plan */}
      <div className="card p-4 mb-4">
        <h5>Selected Plan</h5>
        <p className="fw-bold">
          {plan.subscriptionName} – ₹{plan.priceMonthly}/mo | ₹
          {plan.priceYearly}/year
        </p>
      </div>

      {/* Subscription Duration */}
      <div className="card p-4 mb-4">
        <h5>Subscription Duration</h5>

        {/* Yearly toggle */}
        <div className="form-check mb-3">
          <input
            className="form-check-input"
            type="checkbox"
            id="yearly"
            checked={isYearly}
            onChange={(e) => {
              setIsYearly(e.target.checked);
              if (e.target.checked) {
                dispatch(
                  updatePurchaseField({
                    name: "months",
                    value: 1,
                  })
                );
              }
            }}
          />
          <label className="form-check-label fw-bold" htmlFor="yearly">
            Whole Year (12 months)
          </label>
        </div>

        {/* Month dropdown */}
        <div style={{ opacity: isYearly ? 0.4 : 1 }}>
          <label className="form-label">Select Months (1–11)</label>
          <select
            className="form-select"
            disabled={isYearly}
            name="months"
            value={form.months}
            onChange={handleChange}
          >
            <option value={0}>Select months</option>
            {[...Array(11)].map((_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1} month{i + 1 > 1 ? "s" : ""}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Summary */}
      <div className="card p-4 mb-4">
        <h5>Summary</h5>
        <p className="fs-4 fw-bold">
          Amount to Pay: ₹{totalAmount.toFixed(2)}
        </p>
        <p className="text-muted">
          Expires on: {expirationDate.toDateString()}
        </p>
      </div>

      {error && <p className="text-danger">{error}</p>}
      {loading && <p className="text-info">Creating company...</p>}

      <button
        className="btn btn-success w-100"
        onClick={submitCompany}
        disabled={loading}
      >
        {loading ? "Processing..." : "Proceed to Payment"}
      </button>
    </div>
  );
}
