import React, { useContext } from "react";
import CartContext from "../../store/cart-context.js";
import CarouselFade from "../../components/CarouselFade.js";
import classes from "./Home.module.css";

function TeacherHome() {
  const { userType } = useContext(CartContext);

  return (
    <div className={classes.home}>
      <div className={classes.container}>
        <CarouselFade />
        <div>Write Marks {userType}</div>
      </div>
    </div>
  );
}

export default TeacherHome;
