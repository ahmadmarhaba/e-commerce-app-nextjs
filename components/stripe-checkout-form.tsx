import { useState } from "react";
import { useStripe, useElements , CardNumberElement, CardCvcElement, CardExpiryElement, CardElement} from "@stripe/react-stripe-js";
import styles from '../styles/Card.module.css'
import axios from "axios";
import Router, { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../store/actions/userAction";

const StripeCheckoutForm = () => {
    const [isProcessing, setProcessingTo] = useState(false);
    const [checkoutError, setCheckoutError] = useState<any>();
    let { user } = useSelector((state: any) => state.user)
    const stripe = useStripe();
    const elements = useElements();
    const router = useRouter();
    const dispatch : any = useDispatch();
    /**
     * The cardElements onChange prop can be used to
     * add a handler for setting any errors.
     * @param event
     */
    const handleCardDetailsChange = (event : any) => {
        event.error ? setCheckoutError(event.error.message) : setCheckoutError(false);
    };

    const handleFormSubmit = async (ev : any) => {
        ev.preventDefault();

        /**
         * We disable the form, until the stripe.js has finished
         * loading.
         */
        if (!stripe || !elements || !user.checkout || user.checkout == 0) {
            return;
        }

        const billingDetails = {
            name: 'Ahmad Marhaba',
            email: 'ahmadmarhaba@gmail.com',
            address: {
                city: 'Pune',
                line1: 'Address 1',
                state: 'my state',
                postal_code: '2200'
            }
        };

        setProcessingTo(true);
        const cardElement = elements.getElement("cardNumber");
        const price = user.checkout;
        try {
            const { data: clientSecret } = await axios.post("/api/stripe-payment-intent", {
                amount: price * 100
            });

            const paymentMethodReq = await stripe.createPaymentMethod({
                type: "card",
                card: cardElement as any,
                billing_details: billingDetails
            });

            if (paymentMethodReq.error) {
                setCheckoutError(paymentMethodReq.error.message);
                setProcessingTo(false);
                return;
            }

            const { error } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: paymentMethodReq.paymentMethod.id
            });

            if (error) {
                setCheckoutError(error.message);
                setProcessingTo(false);
                return;
            }
            dispatch(fetchUser({ cart: [] , checkout : 0}))
            // On successful payment, redirect to thank you page.
            await Router.push("/thank-you")
        } catch (err : any) {
            setCheckoutError(err.message);
        }
    };

    if(!user || !user.checkout || !user.cart){
        router.push("/");
        return <></>;
    }
    return (
        <form onSubmit={handleFormSubmit} className={styles.container}>
            <h2 className="">Pay with card</h2>
            <div className="">
                <h3 className="">Card Information</h3>
                {checkoutError ? <div className={styles.error}>{checkoutError}</div> : null}
                <CardNumberElement onChange={handleCardDetailsChange} className={styles.input} />
                <CardExpiryElement onChange={handleCardDetailsChange} className={styles.input}/>
                <CardCvcElement onChange={handleCardDetailsChange} className={styles.input}/>
                <button className="" disabled={isProcessing || !stripe}>
                    {isProcessing ? "Processing..." : `Submit`}
                </button>
            </div>
            <div className={styles.example}>
                <div>Test Card info</div>
                <div>Number: 4242 4242 4242 4242</div>
                <div>Expiry: Any MM/YY older than current date</div>
                <div>Cvc: Any 3 or 4 digit number</div>
            </div>
        </form>
    );
};

export default StripeCheckoutForm;