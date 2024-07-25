import React from "react";
import Navbar from "../components/Navbar";
import CalculatorSection from "../components/FinanceCalculator/CalculatorSection";

const FinanceCalculator = () => {
  const info1 = {
    number: "4",
    heading: "Bank & Post Office",
    headingText:
    "Discover various savings and investment schemes like Sukanya Samriddhi Account, Senior Citizens Savings Scheme, Kisan Vikas Patra, and Mahila Samman Savings Certificate.",
    subHeading: ["SSA", "SCSS", "KVP", "MSSC"],
    paths: ["/calculator/sukanya-samriddhi", "/calculator/senior-citizens-savings", "/calculator/kisan-vikas-patra", "/calculator/mahila-samman-savings"],
    subHeadingText: ["Sukanya Samriddhi Account", "Senior Citizens Savings Scheme", "Kisan Vikas Patra", "Mahila Samman Savings Certificate"],
  };
  const info2 = {
    number: "2",
    heading: "Post Office",
    headingText:
      "Explore a range of financial products including Monthly Income Scheme, Recurring Deposit, Time Deposit, National Savings Certificate, and current interest rates.",
    subHeading: ["MIS", "NSC"],
    paths: ["/calculator/monthly-income-scheme", "/calculator/national-savings"],
    subHeadingText: ["Monthly Income Scheme", "National Savings Certificate"],
  };
  const info3 = {
    number: "2",
    heading: "Bonds",
    headingText:
      "Discover a variety of bond options including Bonds Overview, Floating Rate Savings Bonds, Sovereign Gold Bond Scheme, and 54EC Bonds for saving on capital gains tax.",
    subHeading: ["FRSB", "SGB"],
    paths: ["/calculator/floating-rate-savings-bonds", "/calculator/sovereign-gold-bond-scheme"],
    subHeadingText: ["Floating Rate Savings Bonds", "Sovereign Gold Bond Scheme"],
  };
  const info4 = {
    number: "1",
    heading: "Bank",
    headingText:
      "Explore various banking products including basic loan options and current interest rates.",
    subHeading: ["EMI"],
    subHeadingText: ["Loan-Basic"],
    paths: ["/calculator/loan-basic"],
  };
  const info5 = {
    number: "1",
    heading: "General",
    headingText:
      "Learn about essential financial concepts including Compound Interest (Future Value), Simple Interest, and Inflation.",
    subHeading: ["INFL"],
    paths: ["/calculator/inflation"],
    subHeadingText: ["Inflation"],
  };
  return (
    <div>
      <Navbar />
      <CalculatorSection info={info1} />
      <CalculatorSection info={info2} />
      <CalculatorSection info={info3} />
      <CalculatorSection info={info4} />
      <CalculatorSection info={info5} />
    </div>
  );
};

export default FinanceCalculator;
