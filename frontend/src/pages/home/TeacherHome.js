import React, { useContext } from "react";
import CartContext from "../../store/cart-context.js";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function TeacherHome() {
  const navigate = useNavigate();

  const { userType, email } = useContext(CartContext);
  console.log("email", email);
  const recordGrade = () => {
    navigate("/recordGrade");
  };

  const viewGrade = () => {
    navigate("/viewGrade");
  };
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      {email !== "nothing" ? (
        <div>
          <h1 style={{ marginTop: "20vh", marginBottom: "20px" }}>
            Write Marks {userType}
          </h1>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <Button
              onClick={recordGrade}
              style={{ width: "200px", height: "50px" }}
            >
              Record assignment
            </Button>
            <Button
              onClick={viewGrade}
              style={{ marginLeft: "10px", width: "200px", height: "50px" }}
            >
              View student record
            </Button>
          </div>
        </div>
      ) : (
        <h1>Please login</h1>
      )}
    </div>
  );
}

export default TeacherHome;
