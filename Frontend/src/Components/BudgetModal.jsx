import axios from "axios";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const expenseCategories = [
  "Housing Costs",
  "Transportation",
  "Food and Groceries",
  "Health and Medical",
  "Personal and Family",
  "Debt and Savings",
  "Miscellaneous",
];

const BudgetModal = () => {
  const [newEvent, setNewEvent] = useState({
    title: "",
    start: "",
    end: "",
    amount: "",
    type: "",
    email: "",
  });
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const userInfo = {
      email: JSON.parse(localStorage.getItem("Users")).email,
      type: selectedCategory,
      title: document.getElementById("title").value,
      date: document.getElementById("budget_date").value,
      amount: document.getElementById("budget_amount").value,
    };
    await axios
      .post("http://localhost:4000/budget/budgetAdd", userInfo)
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          toast.success("Budget Added");
          setTimeout(() => {
            window.location.reload();
          }, 3000);
        }
      })
      .catch((err) => {
        if (err.response) {
          console.log(err);
          toast.error("Error: " + err.response.data.message);
          setTimeout(() => {}, 3000);
        }
      });
  };

  return (
    <div>
      <div role="alert">
        <dialog id="budget_modal" className="modal">
          <div>
            <form method="dialog" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <div className="relative py-8 px-5 md:px-10 bg-white shadow-md rounded-xl w-[30rem] border border-gray-400">
                  <div className="w-full flex justify-start text-gray-600 mb-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="icon icon-tabler icon-tabler-wallet"
                      width="52"
                      height="52"
                      viewBox="0 0 24 24"
                      strokeWidth="1"
                      stroke="currentColor"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" />
                      <path d="M17 8v-3a1 1 0 0 0 -1 -1h-10a2 2 0 0 0 0 4h12a1 1 0 0 1 1 1v3m0 4v3a1 1 0 0 1 -1 1h-12a2 2 0 0 1 -2 -2v-12" />
                      <path d="M20 12v4h-4a2 2 0 0 1 0 -4h4" />
                    </svg>
                  </div>
                  <h1 className="text-gray-800 font-lg font-bold tracking-normal leading-tight mb-4">
                    Add Budget details
                  </h1>
                  <label
                    htmlFor="name"
                    className="text-gray-800 text-sm font-bold leading-tight tracking-normal"
                  >
                    Name
                  </label>
                  <br />
                  <select
                    id="category"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="bg-white mb-1 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 text-gray-600 border-gray-300 rounded border"
                  >
                    <option value="" disabled className="bg-white">
                      -- Select an option --
                    </option>
                    <option value="Income">Income</option>
                    <option value="Expense">Expense</option>
                  </select>
                  <div className="flex-col">
                    <label
                      htmlFor="expense_date"
                      className="text-gray-800 text-sm font-bold leading-tight tracking-normal"
                    >
                      Date
                    </label>
                    <div className="relative mb-5 mt-2">
                      <div className="absolute right-0 text-gray-600 flex items-center pr-3 h-full"></div>
                      <DatePicker
                        className="bg-white w-full rounded-md border mb-2 border-[#e0e0e0] py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                        placeholder="Select Date"
                        id="budget_date"
                        selected={newEvent.start}
                        onChange={(date) =>
                          setNewEvent({ ...newEvent, start: date, end: date })
                        }
                      />
                    </div>
                  </div>

                  <label
                    htmlFor="expense_amount"
                    className="text-gray-800 text-sm font-bold leading-tight tracking-normal"
                  >
                    Amount
                  </label>
                  <div className="relative mb-5 mt-2">
                    <input
                      type="number"
                      className="mb-8 text-gray-600 bg-white focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
                      placeholder="Add amount"
                      id="budget_amount"
                      value={newEvent.amount}
                      onChange={(e) =>
                        setNewEvent({ ...newEvent, amount: e.target.value })
                      }
                    />
                  </div>
                  <label
                    htmlFor="expense_description"
                    className="text-gray-800 text-sm font-bold leading-tight tracking-normal"
                  >
                    Title
                  </label>
                  <div className="relative mb-5 mt-2">
                    <input
                      type="text"
                      name="title"
                      id="title"
                      value={newEvent.title}
                      onChange={(e) =>
                        setNewEvent({ ...newEvent, title: e.target.value })
                      }
                      placeholder="Enter the title"
                      className="mb-8 text-gray-600 bg-white focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
                    />
                  </div>
                  <div className="flex items-center justify-start w-full">
                    <button
                      type="submit"
                      className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 transition duration-150 ease-in-out hover:bg-indigo-600 bg-indigo-700 rounded text-white px-8 py-2 text-sm"
                    >
                      Add Budget
                    </button>
                    <button
                      className="focus:outline-none focus:ring-2 focus:ring-offset-2  focus:ring-gray-400 ml-3 bg-gray-100 transition duration-150 text-gray-600 ease-in-out hover:border-gray-400 hover:bg-gray-300 border rounded px-8 py-2 text-sm"
                      onClick={() =>
                        document.getElementById("budget_modal").close()
                      }
                    >
                      Cancel
                    </button>
                  </div>
                  <button
                    className="cursor-pointer absolute top-0 right-0 mt-4 mr-5 text-gray-400 hover:text-gray-600 transition duration-150 ease-in-out rounded focus:ring-2 focus:outline-none focus:ring-gray-600"
                    onClick={() =>
                      document.getElementById("budget_modal").close()
                    }
                    aria-label="close modal"
                    role="button"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="icon icon-tabler icon-tabler-x"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      strokeWidth="2.5"
                      stroke="currentColor"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" />
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </dialog>
      </div>
    </div>
  );
};

export default BudgetModal;
