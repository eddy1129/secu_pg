import React from "react";
import axios from "axios";
import encrypt from "../../util/encryptUtil";
import { useState, useContext } from "react";
import CartContext from "../../store/cart-context.js";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const { userType } = useContext(CartContext);
  const [f_username, setUsername] = useState("");
  const [f_password, setPassword] = useState("");
  const [f_email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleUsername = (e) => {
    setUsername(e.target.value);
    const emailInput = document.getElementById("form3Example1c");
    const emailLabel = document.querySelector('label[for="form3Example1c"]');
    emailInput.addEventListener("input", function () {
      emailLabel.textContent = "";
    });
  };

  const handlePwd = (e) => {
    setPassword(e.target.value);
    const emailInput = document.getElementById("form3Example4c");
    const emailLabel = document.querySelector('label[for="form3Example4c"]');
    emailInput.addEventListener("input", function () {
      emailLabel.textContent = "";
    });
  };

  const handlePwd2 = (e) => {
    const emailInput = document.getElementById("form3Example4cd");
    const emailLabel = document.querySelector('label[for="form3Example4cd"]');
    emailInput.addEventListener("input", function () {
      emailLabel.textContent = "";
    });
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
    const emailInput = document.getElementById("form3Example3c");
    const emailLabel = document.querySelector('label[for="form3Example3c"]');
    emailInput.addEventListener("input", function () {
      emailLabel.textContent = "";
    });
  };

  const addUser = async () => {
    if (!/^(?=.*[A-Z])(?=.*\d)(?=.*\W).{8,}$/.test(f_password)) {
      alert(
        "Invalid password. Password should contain at least one uppercase letter, one digit, and one symbol, and be at least 8 characters long."
      );
      navigate("/register");
    } else {
      const pairKey = encrypt.generateKey();
      const key = await encrypt.encryptByRsa(pairKey.key);
      const vi = await encrypt.encryptByRsa(pairKey.iv);

      const user = {
        username: f_username,
        email: f_email,
        password: f_password,
        userType: userType,
      };

      const encryptedUser = await encrypt.encryptMessage(user, pairKey);

      axios
        .post(`http://localhost:8800/users`, {
          user: encryptedUser,
          pair: { key: key, iv: vi },
        })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
      alert("Welcome ");
      navigate("/login");
    }
  };

  return (
    <section class="vh-100">
      <div class="container h-100">
        <div class="row d-flex justify-content-center align-items-center h-100">
          <div class="col-lg-12 col-xl-11">
            <div
              class="card text-black"
              style={{
                borderradius: "150px",
                backgroundColor: "rgb(230, 253, 246)",
              }}
            >
              <div class="card-body p-md-5">
                <div class="row justify-content-center">
                  <div class="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                    <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                      Sign up {}
                    </p>

                    <form class="mx-1 mx-md-4">
                      <div class="d-flex flex-row align-items-center mb-4">
                        <i class="fas fa-user fa-lg me-3 fa-fw"></i>
                        <div class="form-outline flex-fill mb-0">
                          <input
                            type="text"
                            id="form3Example1c"
                            class="form-control"
                            onChange={handleUsername}
                          />
                          <label class="form-label" for="form3Example1c">
                            Your Name
                          </label>
                        </div>
                      </div>

                      <div class="d-flex flex-row align-items-center mb-4">
                        <i class="fas fa-envelope fa-lg me-3 fa-fw"></i>
                        <div class="form-outline flex-fill mb-0">
                          <input
                            type="email"
                            id="form3Example3c"
                            class="form-control"
                            onChange={handleEmail}
                          />
                          <label class="form-label" for="form3Example3c">
                            Your Email
                          </label>
                        </div>
                      </div>

                      <div class="d-flex flex-row align-items-center mb-4">
                        <i class="fas fa-lock fa-lg me-3 fa-fw"></i>
                        <div class="form-outline flex-fill mb-0">
                          <input
                            type="password"
                            id="form3Example4c"
                            class="form-control"
                            onChange={handlePwd}
                          />
                          <label class="form-label" for="form3Example4c">
                            Password
                          </label>
                        </div>
                      </div>

                      <div class="d-flex flex-row align-items-center mb-4">
                        <i class="fas fa-key fa-lg me-3 fa-fw"></i>
                        <div class="form-outline flex-fill mb-0">
                          <input
                            type="password"
                            id="form3Example4cd"
                            class="form-control"
                            onChange={handlePwd2}
                          />
                          <label class="form-label" for="form3Example4cd">
                            Repeat your password
                          </label>
                        </div>
                      </div>

                      <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                        <button
                          type="button"
                          class="btn btn-primary btn-lg"
                          onClick={addUser}
                        >
                          Register
                        </button>
                      </div>
                    </form>
                  </div>
                  <div class="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                    <img
                      src="https://i0.wp.com/0xcryptoez.com/wp-content/uploads/2022/08/%E5%85%83%E5%AE%87%E5%AE%99%E6%89%8B%E6%A9%9F-%E7%B2%BE%E9%81%B8%E5%9C%96.jpg?resize=1024%2C538&ssl=1"
                      class="img-fluid"
                      alt="Sample"
                      style={{ width: 700 }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
