//rafce
import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { payment } from "../../api/stripe";
import useEcomstore from '../../store/ecom-store'
import CheckoutForm from "../../components/CheckoutForm";

const stripePromise = loadStripe("pk_test_51QKz80AuwZFe2wW6GNBYdz5Nah6MMiTwghczr1TBsnw1qVC3t5cwChKP7YOhWjPrGrkZMiYAMWDi5MurW7yW0dc200oOGeL7MZ");


const Payment = () => {
  const token = useEcomstore((s)=>s.token)
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    payment(token)
    .then((res)=>{
      console.log(res)
      setClientSecret(res.data.clientSecret)
    })
    .catch((err)=>{
      console.log(err)    })
  },[])

  const appearance = {
    theme: 'stripe',
  };
  // Enable the skeleton loader UI for optimal loading.
  const loader = 'auto';

  return (
    <div>
      {
        clientSecret && (
          <Elements options={{clientSecret, appearance, loader}} stripe={stripePromise}>
              <CheckoutForm/>
          </Elements>
        )
      }
    </div>
  )
}

export default Payment