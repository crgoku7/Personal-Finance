import React from "react";
import { Sidebar } from "../components/Sidebar";
import IncomeCategoriesChart from "../components/Charts/IncomeCategoriesGraph";
import IncomeMonthGraph from "../components/Charts/IncomeMonthGraph";
import IncomeCategoriesPieChart from "../components/Charts/IncomeCategoriesPieChart";

const IncomeOverview = () => {
  return (
    <div>
      <Sidebar />
      <div className="pl-64">
        <div className="flex flex-col h-screen">
          <div className="flex flex-1 p-2 space-x-2">
            <div className="flex-1 border border-gray-600 p-2 rounded-lg shadow-lg">
              <IncomeCategoriesChart />
            </div>
            <div className="flex-1 border border-gray-600 p-2 rounded-lg">
              <IncomeCategoriesPieChart />
            </div>
          </div>
          <div className="flex-1 border border-gray-600 p-2 rounded-lg">
            <IncomeMonthGraph />
          </div>
        </div>
      </div>
    </div>
  );
};

export default IncomeOverview;
