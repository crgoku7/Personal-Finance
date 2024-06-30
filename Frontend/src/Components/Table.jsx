import React, { useEffect, useState } from "react";
import IncomeModal from "./IncomeModal";
import ExpenseModal from "./ExpenseModal";
import axios from "axios";

export function Table() {
  const [transactions, setTransactions] = useState([]);
  useEffect(() => {
    const getTransactions = async () => {
      try {
        const res = await axios.get(
          "http://localhost:4000/incomeExpense/incomeExpenseGet"
        );
        const email = JSON.parse(localStorage.getItem("Users")).email;
        const requiredData = res.data.filter((data) => data.email === email);
        const updatedData = requiredData.map((item) => {
          const datePart = item.date.split("T")[0];
          const date = new Date(datePart);
          const options = { day: "numeric", month: "long", year: "numeric" };
          const formattedDate = date.toLocaleDateString("en-GB", options);
          return { ...item, date: formattedDate };
        });
        setTransactions(updatedData);
      } catch (error) {
        console.log("Error", error);
      }
    };
    getTransactions();
  }, []);

  return (
    <>
      <div className="ml-64">
        <section className="mx-auto w-full max-w-7xl px-4 py-4 overflow-hidden">
          <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
            <div>
              <h2 className="text-lg font-semibold">Transactions</h2>
              <p className="mt-1 text-sm text-gray-400">
                This is a list of all transactions. You can add new
                Income/Expense.
              </p>
            </div>
            <div className="flex">
              <div>
                <a
                  type="button"
                  onClick={() =>
                    document.getElementById("income_modal").showModal()
                  }
                  className="rounded-md mr-3 bg-black px-3 py-2 text-sm font-semibold cursor-pointer text-white shadow-sm hover:bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                >
                  Add Income
                </a>
                <IncomeModal />
              </div>
              <div>
                <a
                  type="button"
                  onClick={() =>
                    document.getElementById("expense_modal").showModal()
                  }
                  className="rounded-md bg-black px-3 py-2 text-sm font-semibold cursor-pointer text-white shadow-sm hover:bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                >
                  Add Expense
                </a>
                <ExpenseModal />
              </div>
            </div>
          </div>
          <div className="mt-6 flex flex-col">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                <div className="overflow-hidden border border-gray-200 md:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-12 py-3.5 text-left text-sm font-normal text-gray-700"
                        >
                          <span>Name</span>
                        </th>
                        <th
                          scope="col"
                          className="px-12 py-3.5 text-left text-sm font-normal text-gray-700"
                        >
                          Date
                        </th>

                        <th
                          scope="col"
                          className="px-14 py-3.5 text-left text-sm font-normal text-gray-700"
                        >
                          Type
                        </th>

                        <th
                          scope="col"
                          className="px-12 py-3.5 text-left text-sm font-normal text-gray-700"
                        >
                          Amount(INR)
                        </th>
                        <th
                          scope="col"
                          className="px-20 py-3.5 text-left text-sm font-normal text-gray-700"
                        >
                          Description
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {transactions.map((transaction) => (
                        <tr key={transaction._id}>
                          <td className="whitespace-nowrap px-10 py-4">
                            <div className="flex items-center">
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">
                                  {transaction.name}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-12 py-4">
                            <div className="text-sm text-gray-900 ">
                              {transaction.date}
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-12 py-4">
                            <span
                              className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                                transaction.type === "income"
                                  ? "text-green-800 bg-green-100"
                                  : "text-red-800 bg-red-100"
                              }`}
                            >
                              {transaction.type}
                            </span>
                          </td>

                          <td className="whitespace-nowrap px-12 py-4 text-sm text-gray-700">
                            {transaction.amount}
                          </td>
                          <td className="whitespace-wrap px-12 py-4 text-sm text-gray-700 text-wrap">
                            {transaction.description}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
