import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import AuthContext from "../../store/auth-context.js";
/* import CartContext from "../../store/cart-context.js";*/
import ProductItem from "../../components/ProductItem";
import CarouselFade from "../../components/CarouselFade";
import classes from "./Home.module.css";
import productsData from "../../productsData";

function Home() {
  const { username } = useContext(AuthContext);
  /*  const { userType } = useContext(CartContext); */

  const [paymentRecord, setPaymentRecord] = useState([]);
  useEffect(() => {
    const fetchPaymentRecord = async () => {
      const response = await axios.get("http://localhost:8800/paymentRecord");
      const data = await response.data;
      if (data) {
        const filteredData = data.filter((record) => record.name === username);
        setPaymentRecord(filteredData);
      }
    };
    fetchPaymentRecord();
  }, [username]);

  // Initialize the state indicating the active page

  // Compute the products should be shown in current page
  const productsList = productsData.map((item) => (
    <ProductItem
      key={item.id}
      id={item.id}
      name={item.name}
      author={item.author}
      price={item.price}
      image={item.image}
    />
  ));
  console.log("paymentRecord", paymentRecord);
  return (
    <div className={classes.home}>
      <div className={classes.container}>
        <CarouselFade />
        {username !== null ? (
          <div>
            {paymentRecord.length === 0 ? (
              <div className={classes.productsContainer}>{productsList}</div>
            ) : (
              <div className={classes.productsContainer}>
                <h1 style={{ textAlign: "center" }}>Paid Course Fee</h1>
              </div>
            )}
          </div>
        ) : (
          <h1>Nothing</h1>
        )}
      </div>
    </div>
  );
}

export default Home;
