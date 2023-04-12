// Import the secret key
const secret = process.env.STRIPE_SECRET_KEY;

// Require stripe with your secret key
const stripe = require("stripe")(secret);

exports.create = (req, res) => {
  // Create a charge
  stripe.charges.create(
    {
      // Stripe API perceive amount as the smallest currency unit
      // This means it charge 100 as $1.00, so we should multiply by 100
      amount: req.body.amount * 100,
      currency: "hkd",
      source: req.body.tokenId,
      description: "Test payment",
    },
    // Send charge data if successful, otherwise send error
    (err, charge) => {
      if (err) {
        console.log(err);
        res.status(500).send(err);
      } else {
        res.status(200).send(charge);
      }
    }
  );
}