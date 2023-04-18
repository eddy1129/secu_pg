import React, { useContext } from "react";
import CartContext from "../../store/cart-context.js";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function TeacherHome() {
  const navigate = useNavigate();

  const { userType } = useContext(CartContext);

  const recordGrade = () => {
    navigate("/recordGrade");
  };

  const viewGrade = () => {
    navigate("/viewGrade");
  };
  return (
    <div>
      <h1>Write Marks {userType}</h1>

      <Button onClick={recordGrade}> Record assignment </Button>
      <Button onClick={viewGrade}>Veiw student record</Button>
    </div>
  );
}

export default TeacherHome;
