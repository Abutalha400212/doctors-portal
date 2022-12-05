import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import { useLoaderData } from "react-router-dom";
import CheckoutForm from "./CheckoutForm";
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_SECRET);
const Payment = () => {
  const data = useLoaderData();
  console.log(data);
  return (
    <div>
      <h1>{data.treatment}</h1>
      <p>
        Please Pay ${data.price} for your appointment on {data.appointmentDate}{" "}
        at {data.slot}
      </p>
      <div className="w-96 my-12">
        <Elements stripe={stripePromise}>
          <CheckoutForm booking={data} />
        </Elements>
      </div>
    </div>
  );
};

export default Payment;
