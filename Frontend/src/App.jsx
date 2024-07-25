import { Routes, Route, Navigate } from "react-router-dom";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Home from "./Pages/Home";
import Signup from "./Pages/Signup";
import { Toaster } from "react-hot-toast";
import { useAuth } from "./context/AuthProvider";
import Dashboard from "./Pages/Dashboard";
import IncomeExpense from "./Pages/IncomeExpense";
import FinanceCalculator from "./Pages/FinanceCalculator";
import LoanBasic from "./Pages/LoanBasic";
import Inflation from "./Pages/Inflation";
import KisanVikasPatra from "./Pages/KisanVikasPatra";
import SukanyaSamriddhi from "./Pages/SukanyaSamriddhi";
import BudgetPlanner from "./Pages/BudgetPlanner";
import ExpenseOverview from "./Pages/ExpenseOverview";
import IncomeOverview from "./Pages/IncomeOverview";
import SeniorCitizensSavingsScheme from "./components/FinanceCalculator/SeniorCitizensSavingsScheme";
import MahilaSammanSavings from "./components/FinanceCalculator/MahilaSammanSavings";
import MonthlyIncomeScheme from "./components/FinanceCalculator/MonthlyIncomeScheme";
import NationalSavings from "./components/FinanceCalculator/NationalSavings";
import FloatingRateSavingsBonds from "./components/FinanceCalculator/FloatingRateSavingsBonds";
import SovereignGoldBondScheme from "./components/FinanceCalculator/SovereignGoldBondScheme";

function App() {
  const [authUser, setAuthUser] = useAuth();
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/dashboard"
          element={authUser ? <Dashboard /> : <Navigate to="/signup" />}
        />
        <Route path="/income-expense" element={<IncomeExpense />} />
        <Route path="/calculator" element={<FinanceCalculator />} />
        <Route path="/calculator/loan-basic" element={<LoanBasic />} />
        <Route path="/calculator/Inflation" element={<Inflation />} />
        <Route path="/calculator/kisan-vikas-patra" element={<KisanVikasPatra />} />
        <Route path="/calculator/sukanya-samriddhi" element={<SukanyaSamriddhi />} />
        <Route path="/budget-planner" element={<BudgetPlanner />} />
        <Route path="/expense-overview" element={<ExpenseOverview />} />
        <Route path="/income-overview" element={<IncomeOverview />} />
        <Route path="/calculator/senior-citizens-savings" element={<SeniorCitizensSavingsScheme />} />
        <Route path="/calculator/mahila-samman-savings" element={<MahilaSammanSavings />} />
        <Route path="/calculator/monthly-income-scheme" element={<MonthlyIncomeScheme />} />
        <Route path="/calculator/national-savings" element={<NationalSavings />} />
        <Route path="/calculator/floating-rate-savings-bonds" element={<FloatingRateSavingsBonds />} />
        <Route path="/calculator/sovereign-gold-bond-scheme" element={<SovereignGoldBondScheme />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
