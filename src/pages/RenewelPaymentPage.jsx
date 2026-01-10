import React from "react";
import { useLocation } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import RenewelStripeCheckoutForm from "./RenewelStripeCheckoutForm";

const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLIC_KEY
);

export default function RenewelPaymentPage() {
  const { state } = useLocation();
  const companyId = state?.companyId;
  console.log("from RenewelPayment ",companyId);
  

  if (!companyId) {
    return <p className="text-center">Invalid payment request</p>;
  }

  return (
    <div className="container py-5">
      <h3 className="fw-bold mb-4">Complete Payment</h3>

      <Elements stripe={stripePromise}>
        <RenewelStripeCheckoutForm companyId={companyId} />
      </Elements>
    </div>
  );
}
