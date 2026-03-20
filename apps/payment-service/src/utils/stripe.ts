import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRECT_KEY!);

export default stripe;
