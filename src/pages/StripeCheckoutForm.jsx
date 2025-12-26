import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";
import axiosClient from "../redux/api/axiosClient";
import "../styles/stripeCheckoutForm.css";

export default function StripeCheckoutForm({ companyId }) {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const handlePayment = async () => {
    try {
      setLoading(true);
      setError(null);

      // STEP 1: Create Payment Intent
      const intentRes = await axiosClient.post("/Payment/create-intent", {
        companyId,
      });

      const { clientSecret, paymentIntentId } = intentRes.data;

      // STEP 2: Confirm Card Payment
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (result.error) {
        throw new Error(result.error.message);
      }

      // STEP 3: Confirm payment with backend
      await axiosClient.post("/Payment/confirm", {
        paymentIntentId,
        companyId,
      });

      // STEP 4: Show success modal
      setShowSuccess(true);

      // STEP 5: Redirect after fade
      setTimeout(() => {
        navigate("/login", { replace: true });
      }, 2500);

    } catch (err) {
      console.error("Payment error:", err);
      setError(err.message || "Payment failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* SUCCESS MODAL */}
      {showSuccess && (
        <div className="success-overlay">
          <div className="success-modal">
            <h4>Payment Successful 🎉</h4>
            <p>Your account has been activated.</p>
          </div>
        </div>
      )}

      {/* PAYMENT FORM */}
      <div className="card p-4">
        <h5 className="mb-3">Card Details</h5>

        <CardElement className="form-control p-2 mb-3" />

        {error && <p className="text-danger">{error}</p>}

        <button
          className="btn btn-success w-100"
          onClick={handlePayment}
          disabled={!stripe || loading || showSuccess}
        >
          {loading ? "Processing..." : "Pay Now"}
        </button>
      </div>
    </>
  );
}
