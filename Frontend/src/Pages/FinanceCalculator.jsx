import React from "react";
import Navbar from "../Components/Navbar";
import CalculatorSection from "../Components/CalculatorSection";

const FinanceCalculator = () => {
  const info1 = {
    number: "6",
    heading: "Bank",
    headingText:
      "Explore various banking products including basic and advanced loan options, fixed and recurring deposits, and current interest rates.",
    subHeading: ["EMI", "EMI", "FD", "FD", "RD", "%"],
    subHeadingText: ["Loan-Basic", "Loan-Advanced", "Fixed Deposit- TDR (Interest Payout)", "Fixed Deposit- STDR (Cumulative)", "Recurring Deposit", "Interest Rates(%)"],
    paths: ["/loan-basic", "/", "/", "/", "/", "/"],
  };
  const info2 = {
    number: "5",
    heading: "Bank & Post Office",
    headingText:
      "Discover various savings and investment schemes like Public Provident Fund, Sukanya Samriddhi Account, Senior Citizens Savings Scheme, Kisan Vikas Patra, and Mahila Samman Savings Certificate.",
    subHeading: ["PPF", "SSA", "SCSS", "KVP", "MSSC"],
    paths: ["/", "/sukanya-samriddhi", "/", "/kisan-vikas-patra", "/"],
    subHeadingText: ["Public Provident Fund", "Sukanya Samriddhi Account", "Senior Citizens Savings Scheme", "Kisan Vikas Patra", "Mahila Samman Savings Certificate"],
  };
  const info3 = {
    number: "5",
    heading: "Post Office",
    headingText:
      "Explore a range of financial products including Monthly Income Scheme, Recurring Deposit, Time Deposit, National Savings Certificate, and current interest rates.",
    subHeading: ["MIS", "RD", "TD", "NSC", "%"],
    paths: ["/", "/", "/", "/", "/"],
    subHeadingText: ["Monthly Income Scheme", "Reccuring Deposit", "Time Deposit", "National Savings Certificate", "Interest Rates(%)"],
  };
  const info4 = {
    number: "4",
    heading: "Mutual Funds",
    headingText:
      "The \"Mutual Funds\" section provides an overview and options for various investment plans including Equity Linked Savings Scheme (ELSS), Systematic Investment Plans (SIP), and Systematic Withdrawal Plans (SWP).",
    subHeading: ["MF", "ELSS", "SIP", "SWP",],
    paths: ["/", "/", "/", "/"],
    subHeadingText: ["Mutual Funds Overview", "Equity Linked Savings Scheme", "Systematic Investment Plans", "Systematic Withdrawl Plan"],
  };
  const info5 = {
    number: "5",
    heading: "Retirement",
    headingText:
      "The \"Retirement\" section outlines various pension and provident fund schemes including the National Pension System (NPS), Employees Provident Fund (EPF), Atal Pension Scheme (APS), PM Shram Yogi Maan-Dhan (SYM), and the Gratuity Scheme.",
    subHeading: ["NPS", "EPF", "APS", "SYM", "GRT"],
    paths: ["/", "/", "/", "/", "/"],
    subHeadingText: ["National Pension System", "Employees Provident Fund", "Ata Pension Scheme", "PM Sharan Yogi Maan-dhan", "Gratuity Scheme"],
  };
  const info6 = {
    number: "2",
    heading: "Tax",
    headingText:
      "The \"Tax\" section provides information on different types of taxes, including Income Tax (IT) and Capital Gains Tax (CGT).",
    subHeading: ["IT", "CGT"],
    paths: ["/", "/"],
    subHeadingText: ["Income Tax", "Capital Gains Tax"],
  };
  const info7 = {
    number: "4",
    heading: "Insurance",
    headingText:
      "Explore various insurance plans including Postal Life Insurance, Rural Postal Life Insurance, PM Jeevan Jyoti Bima (Life), and PM Suraksha Bima (Accident).",
    subHeading: ["PLI", "RPLI", "JJB", "SB"],
    paths: ["/", "/", "/", "/"],
    subHeadingText: ["Postal Life Insurance", "Rural Postal Life Insurance", "PM Jeevan Jyoti Bima(Life)", "PM Suraksha Bima(Accident)"],
  };
  const info8 = {
    number: "4",
    heading: "Bonds",
    headingText:
      "Discover a variety of bond options including Bonds Overview, Floating Rate Savings Bonds, Sovereign Gold Bond Scheme, and 54EC Bonds for saving on capital gains tax.",
    subHeading: ["BOND", "FRSB", "SGB", "54EC"],
    paths: ["/", "/", "/", "/"],
    subHeadingText: ["Bonds Overview", "Floating Rate Savings Bonds", "Sovereign Gold Bond Scheme", "54EC Bonds(Save Capital Gains Tax)"],
  };
  const info9 = {
    number: "3",
    heading: "General",
    headingText:
      "Learn about essential financial concepts including Compound Interest (Future Value), Simple Interest, and Inflation.",
    subHeading: ["CI", "SI", "INFL"],
    paths: ["/", "/", "/inflation"],
    subHeadingText: ["Compound Interest(Future Value)", "Simple Interest", "Inflation"],
  };
  return (
    <div>
      <Navbar />
      <CalculatorSection info={info1} />
      <CalculatorSection info={info2} />
      <CalculatorSection info={info3} />
      <CalculatorSection info={info4} />
      <CalculatorSection info={info5} />
      <CalculatorSection info={info6} />
      <CalculatorSection info={info7} />
      <CalculatorSection info={info8} />
      <CalculatorSection info={info9} />
    </div>
  );
};

export default FinanceCalculator;
