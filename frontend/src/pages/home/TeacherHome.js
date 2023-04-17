import React, { useContext } from "react";
import CartContext from "../../store/cart-context.js";
import CarouselFade from "../../components/CarouselFade.js";
import classes from "./Home.module.css";

function TeacherHome() {
  const { userType } = useContext(CartContext);

  return (
    <div>
      <h1>Write Marks {userType}</h1>
    </div>
  );
}

export default TeacherHome;
