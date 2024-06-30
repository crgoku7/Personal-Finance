import React from "react";
import { Sidebar } from "../components/Sidebar";
import ExpenseCategoriesChart from "../components/Charts/ExpenseCategoriesGraph";
import ExpenseCategoriesPieChart from "../components/Charts/ExpenseCategoriesPieChart";
import ExpenseMonthGraph from "../components/Charts/ExpenseMonthGraph";

const ExpenseOverview = () => {
  return (
    <div>
      <Sidebar />
      <div className="pl-64">
        <div className="flex flex-col h-screen">
          <div className="flex flex-1 p-2 space-x-2">
            <div className="flex-1 border border-gray-600 p-2 rounded-lg shadow-lg">
              <ExpenseCategoriesChart />
            </div>
            <div className="flex-1 border border-gray-600 p-2 rounded-lg">
              <ExpenseCategoriesPieChart />
            </div>
          </div>
          <div className="flex-1 border border-gray-600 p-2 rounded-lg">
            <ExpenseMonthGraph />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpenseOverview;
