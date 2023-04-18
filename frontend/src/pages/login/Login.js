import axios from "axios";
import JSEncrypt from "jsencrypt";
import classes from "./Login.module.css";
import { Form, Button } from "react-bootstrap";
import AuthContext from "../../store/auth-context";
import CartContext from "../../store/cart-context";
import { useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";

function Login() {
  const [verifyView, setVerifyView] = useState(false);
  const [email, setEmail] = useState("");
  const [Epassword, setEPassword] = useState("");
  const [vCode, setVCode] = useState("No verify code");

  const navigate = useNavigate();

  const { login } = useContext(AuthContext);
  const { userType, defineEmail } = useContext(CartContext);

  const handleRegister = () => {
    navigate("/register");
  };

  useEffect(() => {
    console.log("Updated vCode:", vCode);
  }, [vCode]);

  const handleSubmit = async (event) => {
    // Prevent default actions
    event.preventDefault();

    const encryptor = new JSEncrypt();

    // Get email and password from the form
    const emailValue = event.target.email.value;
    const passwordValue = event.target.password.value;

    setEmail(emailValue);

    // Get response from the server
    try {
      const rsa = await axios.get("http://localhost:8800/api/getPublicKey");
      console.log(
        "============login===  public key   ================",
        rsa.data.publicKey
      );

      encryptor.setPublicKey(rsa.data.publicKey);
      const encryptedPassword = encryptor.encrypt(passwordValue);
      console.log("encryptedPassword====", encryptedPassword);
      setEPassword(encryptedPassword);

      const vCodeResponse = await axios.post(
        "http://localhost:8800/auth/sendemail",
        {
          email: emailValue,
          password: encryptedPassword,
        }
      );
      defineEmail(emailValue);

      console.log("vCodeResponse.data.verCode", vCodeResponse.data.verCode);
      const verCodeString = vCodeResponse.data.verCode;
      setVCode(verCodeString);
      setVerifyView(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log("==========login email", email);
    console.log("==========login Epassword", Epassword);
    console.log("==========login vCode", vCode);

    const verificationCodeValue = event.target?.verificationCode?.value;
    console.log("input verificationCodeValue", verificationCodeValue);
    if (verificationCodeValue === vCode) {
      try {
        const response = await axios.post("http://localhost:8800/auth/login", {
          email: email,
          password: Epassword,
        });

        console.log("response", response);
        // Get data from the response
        const data = response.data;
        // Define authState
        const authState = {
          isLoggedIn: true,
          token: data.token, // jwt(userId,serect key,expires)
          username: data.username,
          userId: data.userId,
          message: data.message,
        };

        console.log("authState", authState);
        // Call the login function to update authState
        login(authState);
        // Redirect to the home page

        userType === "teacher" ? navigate("/teacher") : navigate("/student");
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className={classes.login}>
      {verifyView && (
        <Form className={classes.form} onSubmit={handleLogin}>
          <Form.Group className="mb-3" controlId="verificationCode">
            <Form.Label>Verification Code</Form.Label>
            <Form.Control
              type="password"
              name="verificationCode"
              placeholder="Enter verification code"
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      )}

      {!verifyView && (
        <Form className={classes.form} onSubmit={handleSubmit}>
          <h1>Log In {userType}</h1>
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
          <Button variant="link" onClick={handleRegister}>
            Register
          </Button>
        </Form>
      )}
    </div>
  );
}

export default Login;
