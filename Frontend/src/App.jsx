import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./Pages/Home";
import Signup from "./Pages/Signup";
import Contact from "./Pages/Contact";
import About from "./Pages/About";
import FinanceCalculator from "./Pages/FinanceCalculator";
import { useAuth } from "./context/AuthProvider";
import Dashboard from "./Pages/Dashboard";
import BudgetPlanner from "./Pages/BudgetPlanner";
import IncomeExpense from "./Pages/IncomeExpense";

function App() {
  const [authUser, setAuthUser] = useAuth();
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/finance-calculator" element={<FinanceCalculator />} />
        <Route
          path="/dashboard"
          element={authUser ? <Dashboard /> : <Navigate to="/signup" />}
        />
        <Route path="/budget-planner" element={<BudgetPlanner />} />
        <Route path="/income-expense" element={<IncomeExpense />} />
      </Routes>
    </>
  );
}

export default App;
