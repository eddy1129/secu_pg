import React from "react";
import classes from "./Navbar.module.css";
import { Link } from "react-router-dom";
import AuthContext from "../store/auth-context";
import { useContext } from "react";

function Navbar(props) {
  const { isLoggedIn, logout, username } = useContext(AuthContext);

  const logoutHandler = () => {
    logout();
    alert("You have been logged out");
  };

  const loginLink = <Link to="/login">Log in</Link>;

  const logoutLink = <Link onClick={logoutHandler}>Log out</Link>;

  const userLink = <Link to="/cart">Hello, {username}!</Link>;

  return (
    <div className={classes.navbar}>
      <Link className={classes.brand}>{props.brand}</Link>
      <Link to="/history" className={classes.brand}>
        My History
      </Link>
      <Link to="/chat" className={classes.brand}>
        {props.chatroom}
      </Link>
      <div className={classes.navLinks}>
        {isLoggedIn && userLink}
        {isLoggedIn ? logoutLink : loginLink}
      </div>
    </div>
  );
}

export default Navbar;
