import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function TakeRecord() {
  const navigate = useNavigate();

  const [userId, setUserId] = useState("");
  const [score, setScore] = useState("");

  const handleUserId = (e) => {
    setUserId(e.target.value);
    const emailInput = document.getElementById("form3Example1c");
    const emailLabel = document.querySelector('label[for="form3Example1c"]');
    emailInput.addEventListener("input", function () {
      emailLabel.textContent = "";
    });
  };

  const handleScore = (e) => {
    setScore(e.target.value);
    const emailInput = document.getElementById("form3Example3c");
    const emailLabel = document.querySelector('label[for="form3Example3c"]');
    emailInput.addEventListener("input", function () {
      emailLabel.textContent = "";
    });
  };

  const addScore = () => {
    axios
      .post(`http://localhost:8800/studentscore`, {
        stuId: userId,
        stuScore: score,
      })
      .then(function (response) {
        console.log(response);
        alert("Updated student marks");
        navigate("/teacher");
      })
      .catch(function (error) {
        console.log(error);
      });
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
                      Take Record
                    </p>

                    <form class="mx-1 mx-md-4">
                      <div class="d-flex flex-row align-items-center mb-4">
                        <i class="fas fa-user fa-lg me-3 fa-fw"></i>
                        <div class="form-outline flex-fill mb-0">
                          <input
                            type="text"
                            id="form3Example1c"
                            class="form-control"
                            onChange={handleUserId}
                          />
                          <label class="form-label" for="form3Example1c">
                            Student ID
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
                            onChange={handleScore}
                          />
                          <label class="form-label" for="form3Example3c">
                            Grade
                          </label>
                        </div>
                      </div>

                      <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                        <Link>
                          <button
                            type="button"
                            class="btn btn-primary btn-lg"
                            onClick={addScore}
                          >
                            Record
                          </button>
                        </Link>
                      </div>
                    </form>
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
