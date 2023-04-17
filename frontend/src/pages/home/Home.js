import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import AuthContext from "../../store/auth-context.js";
import CartContext from "../../store/cart-context.js";

import ProductItem from "../../components/ProductItem";
import CarouselFade from "../../components/CarouselFade";
import PaginationBasic from "../../components/PaginationBasic";
import classes from "./Home.module.css";
import productsData from "../../productsData";

function Home() {
  const { username } = useContext(AuthContext);
  const { userType } = useContext(CartContext);

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
  const [page, setPage] = useState(1);

  // Initialize the products state
  // The products state is initialized with the productsData for testing purpose
  // Change productsData to [] to fetch the data from the API when your server is ready
  //const [products, setProducts] = useState(productsData);

  // Each page contains 6 items
  const limit = 6;

  // useEffect hook is used to fetch the data from the API
  /* useEffect(() => {
    // Declare a async function to fetch the data
    const fetchProducts = async () => {
      // Get the response from the server
      const response = await axios.get("http://localhost:8800/products");
      // Get data from the response
      const data = await response.data;
      // Update the products state
      if (data) {
        setProducts(data);
      }
    };
    // Call the async function
    fetchProducts();
  }, []); */

  // Compute the number of pages from the number of items
  const pageCount = Math.ceil(productsData.length / limit);

  // Compute the products should be shown in current page
  const start = 0 + (page - 1) * limit;
  const currentData = productsData.slice(start, start + limit);

  const productsList = currentData.map((item) => (
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
        {paymentRecord.length === 0 ? (
          <div className={classes.productsContainer}>{productsList}</div>
        ) : (
          <div className={classes.productsContainer}>
            <h1 style={{ textAlign: "center" }}>Paid Course Fee</h1>
          </div>
        )}
        {/* <PaginationBasic pageCount={pageCount} page={page} setPage={setPage} /> */}
      </div>
    </div>
  );
}

export default Home;
