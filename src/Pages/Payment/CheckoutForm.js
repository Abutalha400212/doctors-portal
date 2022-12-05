import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";

const CheckoutForm = ({booking}) => {
    const {price,name,email} = booking
    console.log(booking);
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret , setClientSecret] = useState('')
  const [cardError, setCardError] = useState('');
    useEffect(()=>{
        fetch("https://doctors-lab-server.vercel.app/create-payment-intent", {
            method: "POST",
            headers: { "Content-Type": "application/json",
        authorization: `bearer ${localStorage.getItem('accessToken')}`
        },
            body: JSON.stringify({ price}),
          })
            .then((res) => res.json())
            .then((data) => setClientSecret(data.clientSecret));
        }, [price]);


  const handlePayment = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
        setCardError(error.message);
    } else {
      setCardError('')
    }
    const {paymentIntent, error:confirmError} = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: card,
            billing_details: {
              name: name,
              email:email
            },
          },
        },
      );
      if(confirmError){
        setCardError(confirmError.message);
        return
      }

console.log(paymentIntent);

  };
  return (
    <>
    <form onSubmit={handlePayment}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <button className="btn btn-sm btn-primary mt-5" type="submit" disabled={!stripe || !clientSecret}>
        Pay
      </button>
    </form>
    <p className="text-red-500">{cardError}</p>
    </>
  );
};

export default CheckoutForm;
