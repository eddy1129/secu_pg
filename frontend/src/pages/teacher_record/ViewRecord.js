import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ViewRecord() {
  const navigate = useNavigate();

  const [messageList, setMessageList] = useState([]);
  const [stuId, setStuId] = useState("");

  const handleStuId = (e) => {
    setStuId(e.target.value);
    const emailInput = document.getElementById("form3Example1c");
    const emailLabel = document.querySelector('label[for="form3Example1c"]');
    emailInput.addEventListener("input", function () {
      emailLabel.textContent = "";
    });
  };

  const backhome = () => {
    navigate("/teacher");
  };

  const showScore = () => {
    const fetchMsg = async () => {
      try {
        const response = await axios.get("http://localhost:8800/studentScore");
        const data = response.data;
        const filteredData = data.filter((message) => message.stuId === stuId);
        setMessageList(filteredData);
        console.log("messageList", data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchMsg();
  };

  return (
    <section>
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center">
          <div className="col-lg-12 col-xl-11">
            <div
              className="card text-black"
              style={{
                borderRadius: "150px",
                backgroundColor: "rgb(230, 253, 246)",
              }}
            >
              <div className="card-body p-md-5">
                <div className="row justify-content-center">
                  <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                    <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                      View Record
                    </p>

                    <form className="mx-1 mx-md-4">
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <input
                            type="text"
                            id="form3Example1c"
                            className="form-control"
                            placeholder="Please input student id"
                            onChange={handleStuId}
                          />
                          <label
                            className="form-label"
                            htmlFor="form3Example1c"
                          ></label>
                        </div>
                      </div>

                      <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                        <button
                          style={{ margin: "20px", padding: "20px" }}
                          type="button"
                          className="btn btn-primary btn-lg"
                          onClick={showScore}
                        >
                          View Record
                        </button>

                        <button
                          style={{ margin: "20px" }}
                          type="button"
                          className="btn btn-primary btn-lg"
                          onClick={backhome}
                        >
                          Back
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            style={{
              backgroundColor: "black",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              color: "white",
              width: "50%",
            }}
          >
            {messageList.map((messageContent) => (
              <div key={messageContent.id}>
                <div>
                  <div style={{ textAlign: "center" }}>
                    <h4>Student ID: {messageContent.stuId}</h4>
                    <h4>Score: {messageContent.stuScore}</h4>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
