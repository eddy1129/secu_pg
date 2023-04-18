import React from "react";
import { Link } from "react-router-dom";

export default function TakeRecord() {
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
                <h1 class="text-center h1 fw-bold ">Take Record</h1>
                <div class="row justify-content-center">
                  <div class="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                    <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                      {/*  Sign up {userType} */}
                    </p>

                    <form class="mx-1 mx-md-4">
                      <div class="d-flex flex-row align-items-center mb-4">
                        <i class="fas fa-user fa-lg me-3 fa-fw"></i>
                        <div class="form-outline flex-fill mb-0">
                          <input
                            type="text"
                            id="form3Example1c"
                            class="form-control"
                            /*  onChange={handleUsername} */
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
                            /*  onChange={handleEmail} */
                          />
                          <label class="form-label" for="form3Example3c">
                            Grade
                          </label>
                        </div>
                      </div>

                      <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                        <Link to="/Login">
                          <button
                            type="button"
                            class="btn btn-primary btn-lg"
                            /* onClick={addUser} */
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
