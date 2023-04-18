import axios from "axios";
import React, { useEffect, useContext } from "react";
import StripeCheckout from "react-stripe-checkout";
import CartItem from "../../components/CartItem.js";
import CartContext from "../../store/cart-context.js";
import AuthContext from "../../store/auth-context.js";
import classes from "./Cart.module.css";
import { useNavigate } from "react-router-dom";

// Import publishable key from .env file
const publishableKey = process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY;

function Cart() {
  // Get token from AuthContext
  const { token, username } = useContext(AuthContext);
  const moment = require("moment-timezone");
  const navigate = useNavigate();

  // Set the timezone to Hong Kong
  moment.tz.setDefault("Asia/Hong_Kong");

  // Get the current date and time in Hong Kong
  const now = moment();

  // Format the time as per your requirement
  const formattedTime = now.format("YYYY-MM-DD");

  console.log(formattedTime);

  // Desctructure cartState from CartContext
  const { cartState, clearCart } = useContext(CartContext);

  // Define the total state
  const [total, setTotal] = React.useState(0);

  // Calculate total whenever cartState changes
  useEffect(() => {
    let total = 0;
    cartState.forEach((item) => {
      total += item.price;
    });
    setTotal(total);
  }, [cartState]);

  // Send payment request to server after get the stripe token
  const onToken = async (stripeToken) => {
    const body = JSON.stringify({
      tokenId: stripeToken.id,
      amount: total,
    });

    try {
      const response = await axios.post("http://localhost:8800/payment", body, {
        headers: {
          "Content-Type": "application/json",
          // Send with authorization header to verify the user
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        alert("Payment successful");
        clearCart();
      } else {
        alert("Payment failed");
      }
    } catch (error) {
      console.log(error);
      alert("Payment failed");
    }

    try {
      const record_response = await axios.post(
        "http://localhost:8800/paymentRecord",
        {
          name: username,
          price: total,
          date: formattedTime,
        }
      );

      if (record_response.status === 200) {
        alert("Updated DB");
        navigate("/student");
      } else {
        alert("Payment failed");
      }
    } catch (error) {
      console.log(error);
      alert("Payment failed");
    }
  };

  const cartList = cartState.map((item) => (
    <CartItem
      key={item.id}
      id={item.id}
      name={item.name}
      author={item.author}
      price={item.price}
      image={item.image}
    />
  ));

  return (
    <div className={classes.cart}>
      <h1>My Shopping Cart</h1>
      {cartList.length > 0 ? (
        <div>
          <ul className={classes.cartList}>
            {cartList}
            <StripeCheckout token={onToken} stripeKey={publishableKey}>
              <button>Confirm Payment</button>
            </StripeCheckout>
          </ul>
        </div>
      ) : (
        <p>Your cart is empty</p>
      )}
    </div>
  );
}

export default Cart;
