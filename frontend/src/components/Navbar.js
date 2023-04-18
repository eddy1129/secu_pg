import React from "react";
import classes from "./Navbar.module.css";
import { Link } from "react-router-dom";
import AuthContext from "../store/auth-context";
import CartContext from "../store/cart-context";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

function Navbar(props) {
  const { isLoggedIn, logout, username } = useContext(AuthContext);
  const navigate = useNavigate();

  const { userType } = useContext(CartContext);

  const logoutHandler = () => {
    logout();
    alert("You have been logged out");
    navigate("/");
  };

  const loginLink = <Link to="/checkRobot">Log in</Link>;

  const logoutLink = <Link onClick={logoutHandler}>Log out</Link>;

  const userLink = <Link>Hello, {username}!</Link>;

  return (
    <div>
      {userType !== "nothing" ? (
        <div
          className={userType === "student" ? classes.navbar : classes.navbar2}
        >
          <Link className={classes.brand}>{props.brand}</Link>
          <Link to="/history" className={classes.brand}>
            My History
          </Link>
          <Link to="/chat" className={classes.brand}>
            {props.chatroom}
          </Link>

          <div className={classes.navLinks}>
            {isLoggedIn && userLink}
            {isLoggedIn ? (
              <Link to="/" onClick={logoutHandler}>
                Logout
              </Link>
            ) : (
              loginLink
            )}
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default Navbar;
