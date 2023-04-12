import React from "react";
import axios from "axios";
import classes from "./Login.module.css";
import { Form, Button } from "react-bootstrap";
import AuthContext from "../../store/auth-context";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";

function Login() {
  const navigate = useNavigate();

  const { login } = useContext(AuthContext);

  const handleSubmit = async (event) => {
    // Prevent default actions
    event.preventDefault();

    // Get email and password from the form
    const email = event.target.email.value;
    const password = event.target.password.value;

    // Get response from the server
    try {
      const response = await axios.post("http://localhost:8800/auth/login", {
        email,
        password,
      });
      // Get data from the response
      const data = response.data;
      // Define authState
      const authState = {
        isLoggedIn: true,
        token: data.token,
        username: data.username,
        userId: data.userId,
      };
      // Call the login function to update authState
      login(authState);
      // Redirect to the home page
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={classes.login}>
      <Form className={classes.form} onSubmit={handleSubmit}>
        <h1>Log In</h1>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
        <Button variant="link">Register</Button>
      </Form>
    </div>
  );
}

export default Login;
