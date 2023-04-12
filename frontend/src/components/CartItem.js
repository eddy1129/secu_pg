import React from "react";
import classes from "./CartItem.module.css";
import { useContext } from "react";
import CartContext from "../store/cart-context";

function CartItem(props) {
  const { removeCartItem } = useContext(CartContext);
  const removeCartItemHandler = () => {
    removeCartItem(props.id);
  };

  return (
    <li className={classes.cartItem}>
      <img src={props.image} alt="" />
      <div className={classes.center}>
        <h3>{props.name}</h3>
        <p>By {props.author}</p>
      </div>
      <div className={classes.right}>
        <span>${props.price}</span>
        <span className={classes.remove} onClick={removeCartItemHandler}>
          Remove
        </span>
      </div>
    </li>
  );
}

export default CartItem;
