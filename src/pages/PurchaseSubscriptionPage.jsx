import React, { useEffect } from "react";
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
  console.log("🟦 [COMPONENT] purchaseState:", purchaseState);

  const { form, loading, error, success, companyId } = purchaseState;

  useEffect(() => {
    if (success && companyId) {
      console.log("🟩 Redirecting to payment page");
      navigate("/payment", {
        state: { companyId },
      });
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

  const totalAmount =
    Number(form.years) * plan.priceYearly +
    Number(form.months) * plan.priceMonthly;

  const submitCompany = () => {
    const payload = {
      name: form.name,
      address: form.address,
      email: form.email,
      passWord: form.password,
      confirmPassword: form.password,

      // ✅ MATCH DTO
      selectedSubscriptionId: plan.id,
      expirationMonth: Number(form.months),
      expirationYear: Number(form.years),
    };

    console.log("🟦 [COMPONENT] Submitting payload:", payload);
    dispatch(submitPurchase(payload));
  };

  return (
    <div className="container py-5">
      <h3 className="fw-bold mb-4">Purchase Subscription</h3>

      
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

      <div className="card p-4 mb-4">
        <div className="card p-3 mb-4">
        <h5>Selected Plan</h5>
        <p className="fw-bold">
          {plan.subscriptionName} – ₹{plan.priceMonthly}/mo | ₹
          {plan.priceYearly}/year
        </p>
      </div>

        <h5>Subscription Duration</h5>
        <div className="row">

          <div className="col">
            <input
              type="number"
              min="0"
              className="form-control"
              placeholder="Years"
              name="years"
              value={form.years}
              onChange={handleChange}
            />
          </div>
          <div className="col">
            <input
              type="number"
              min="0"
              className="form-control"
              placeholder="Months"
              name="months"
              value={form.months}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>

      <div className="card p-4 mb-4">
        <h5>Total Amount</h5>
        <p className="fs-4 fw-bold">₹{totalAmount.toFixed(2)}</p>
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
