import React from "react";
import Navbar from "../components/Navbar";
import LoanBasicForm from "../components/FinanceCalculator/LoanBasicForm";

const LoanBasic = () => {
  return (
    <div>
      <Navbar />
      <LoanBasicForm />
    </div>
  );
};

export default LoanBasic;
