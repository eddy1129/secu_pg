import { Button } from "react-bootstrap";
import React, { useContext } from "react";
import CartContext from "../../store/cart-context";
import { useNavigate } from "react-router-dom";

export default function Select() {
  const navigate = useNavigate();

  const { defineStudent, defineTeacher } = useContext(CartContext);

  const selectTeacher = () => {
    defineTeacher();
    navigate("/checkRobot");
  };

  const selectStudent = () => {
    defineStudent();
    navigate("/checkRobot");
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "10%",
        flexDirection: "column",
      }}
    >
      <h1>Login As</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button
          style={{
            width: "20vh",
            height: "20vh",
            marginRight: "5%",
            fontSize: "2em",
          }}
          onClick={selectStudent}
        >
          Student
        </Button>
        <Button
          style={{ width: "20vh", height: "20vh", fontSize: "2em" }}
          onClick={selectTeacher}
        >
          Teacher
        </Button>
      </div>
    </div>
  );
}
