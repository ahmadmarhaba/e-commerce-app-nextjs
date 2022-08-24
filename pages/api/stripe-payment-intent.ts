import Stripe from "stripe";

const stripe = process.env.STRIPE_SECRET_KEY ? new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2022-08-01',
  }) : null;

export default async (req : any, res: any) => {
    if (req.method === "POST") {
        try {
            if(stripe == null) throw {message : "Stripe not found"};
            const { amount } = req.body;
            const paymentIntent = await stripe.paymentIntents.create({
                amount,
                currency: "usd"
            });
            res.status(200).send(paymentIntent.client_secret);
        } catch (err : any) {
            res.status(500).json({ statusCode: 500, message: err.message });
        }
    } else {
        res.setHeader("Allow", "POST");
        res.status(405).end("Method Not Allowed");
    }
};