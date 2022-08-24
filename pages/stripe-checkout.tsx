import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import  Router  from "next/router";
import { useSelector } from "react-redux";
import Nav from "../components/Nav";
import StripeCheckoutForm from "../components/stripe-checkout-form";

const StripeCheckout = () => {

    const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ? process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY : '');

    return (
        <>
            <Nav 
              setCategory={null} 
              categories={null} 
              setSearch={null}
              cartPage={true}
            />
            <Elements stripe={stripePromise}>
                <StripeCheckoutForm />
            </Elements>
        </>
    );
};

export default StripeCheckout;