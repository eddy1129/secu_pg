import { Button } from "react-bootstrap";
import React, { useContext } from "react";
import CartContext from "../../store/cart-context";
import { useNavigate } from "react-router-dom";

export default function Select() {
  const navigate = useNavigate();

  const { defineStudent, defineTeacher } = useContext(CartContext);

  const selectTeacher = () => {
    defineTeacher();
    navigate("/teacher");
  };

  const selectStudent = () => {
    defineStudent();
    navigate("/student");
  };

  return (
    <div>
      <Button onClick={selectStudent}>Student</Button>
      <Button onClick={selectTeacher}>Teacher</Button>
    </div>
  );
}
