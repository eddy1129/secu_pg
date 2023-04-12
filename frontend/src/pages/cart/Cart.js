import axios from "axios";
import React, { useEffect, useContext } from "react";
import StripeCheckout from "react-stripe-checkout";
import CartItem from "../../components/CartItem.js";
import CartContext from "../../store/cart-context.js";
import AuthContext from "../../store/auth-context.js";
import classes from "./Cart.module.css";
// Import publishable key from .env file
const publishableKey = process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY;

function Cart() {
  // Get token from AuthContext
  const { token } = useContext(AuthContext);

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
      const response = await axios.post(
        "http://localhost:8800/payment",
        body,
        {
          headers: {
            "Content-Type": "application/json",
            // Send with authorization header to verify the user
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
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
            <h2>Total: ${total}</h2>
            <StripeCheckout
              token={onToken}
              stripeKey={publishableKey}
            >
              <button>Checkout</button>
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
