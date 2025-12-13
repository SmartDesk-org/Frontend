import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";
import axiosClient from "../redux/api/axiosClient";

export default function StripeCheckoutForm({ companyId }) {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handlePayment = async () => {
    try {
      setLoading(true);
      setError(null);

      // STEP 1: Create payment intent
      const intentRes = await axiosClient.post("/Payment/create-intent", {
        companyId,
      });

      const { clientSecret, paymentIntentId } = intentRes.data;

      // STEP 2: Confirm payment with Stripe
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (result.error) {
        throw new Error(result.error.message);
      }

      // STEP 3: Confirm with backend & activate company
      await axiosClient.post("/Payment/confirm", {
        paymentIntentId,
        companyId,
      });

      // ✅ REDIRECT TO LOGIN
      navigate("/login", { replace: true });

    } catch (err) {
      console.error("Payment error:", err);
      setError(err.message || "Payment failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card p-4">
      <h5 className="mb-3">Card Details</h5>

      <CardElement className="form-control p-2 mb-3" />

      {error && <p className="text-danger">{error}</p>}

      <button
        className="btn btn-success w-100"
        onClick={handlePayment}
        disabled={!stripe || loading}
      >
        {loading ? "Processing..." : "Pay Now"}
      </button>
    </div>
  );
}
