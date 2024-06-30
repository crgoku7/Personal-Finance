import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import "react-datetime/css/react-datetime.css";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

const incomeCategories = ["Job", "Investment", "Business", "Other"];

const IncomeModal = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/income-expense";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const userInfo = {
      email: JSON.parse(localStorage.getItem("Users")).email,
      name: selectedCategory,
      date: document.getElementById("income_date").value,
      type: "income",
      amount: document.getElementById("income_amount").value,
      description: document.getElementById("income_description").value,
    };
    await axios
      .post("http://localhost:4000/incomeExpense/incomeExpenseAdd", userInfo)
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          toast.success("Update Succesfull");
          document.getElementById("income_modal").close();
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

  const [selectedCategory, setSelectedCategory] = useState("");

  const handleChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  return (
    <div>
      <div role="alert">
        <dialog id="income_modal" className="modal">
          <div>
            <form onSubmit={handleSubmit(onSubmit)} method="dialog">
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
                    Enter Income Details
                  </h1>
                  <label
                    htmlFor="name"
                    className="text-gray-800 text-sm font-bold leading-tight tracking-normal"
                  >
                    Name
                  </label>
                  <br />
                  <select
                    id="expense-dropdown"
                    value={selectedCategory}
                    onChange={handleChange}
                    className="bg-white mb-6 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 text-gray-600 border-gray-300 rounded border"
                  >
                    <option value="" disabled className="bg-white">
                      -- Select an option --
                    </option>
                    {incomeCategories.map((category, index) => (
                      <option key={index} value={category} className="bg-white">
                        {category}
                      </option>
                    ))}
                  </select>
                  <div className="flex-col">
                    <label
                      htmlFor="income_date"
                      className="text-gray-800 text-sm font-bold leading-tight tracking-normal"
                    >
                      Date
                    </label>
                    <div className="relative mb-5 mt-2">
                      <div className="absolute right-0 text-gray-600 flex items-center pr-3 h-full">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="icon icon-tabler icon-tabler-calendar-event"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path stroke="none" d="M0 0h24v24H0z" />
                          <rect x="4" y="5" width="16" height="16" rx="2" />
                          <line x1="16" y1="3" x2="16" y2="7" />
                          <line x1="8" y1="3" x2="8" y2="7" />
                          <line x1="4" y1="11" x2="20" y2="11" />
                          <rect x="8" y="15" width="2" height="2" />
                        </svg>
                      </div>
                      <input
                        id="income_date"
                        className="text-gray-600 bg-white focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
                        type="date"
                      />
                    </div>
                  </div>

                  <label
                    htmlFor="income_amount"
                    className="text-gray-800 text-sm font-bold leading-tight tracking-normal"
                  >
                    Amount
                  </label>
                  <div className="relative mb-5 mt-2">
                    <input
                      id="income_amount"
                      className="mb-8 text-gray-600 bg-white focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
                      placeholder="INR"
                    />
                  </div>
                  <label
                    htmlFor="income_description"
                    className="text-gray-800 text-sm font-bold leading-tight tracking-normal"
                  >
                    Description
                  </label>
                  <div className="relative mb-5 mt-2">
                    <input
                      id="income_description"
                      className="mb-8 text-gray-600 bg-white focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
                    />
                  </div>
                  <div className="flex items-center justify-start w-full">
                    <button
                      type="submit"
                      className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 transition duration-150 ease-in-out hover:bg-indigo-600 bg-indigo-700 rounded text-white px-8 py-2 text-sm"
                    >
                      Submit
                    </button>
                    <button
                      className="focus:outline-none focus:ring-2 focus:ring-offset-2  focus:ring-gray-400 ml-3 bg-gray-100 transition duration-150 text-gray-600 ease-in-out hover:border-gray-400 hover:bg-gray-300 border rounded px-8 py-2 text-sm"
                      onClick={() =>
                        document.getElementById("income_modal").close()
                      }
                    >
                      Cancel
                    </button>
                  </div>
                  <button
                    className="cursor-pointer absolute top-0 right-0 mt-4 mr-5 text-gray-400 hover:text-gray-600 transition duration-150 ease-in-out rounded focus:ring-2 focus:outline-none focus:ring-gray-600"
                    onClick={() =>
                      document.getElementById("income_modal").close()
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

export default IncomeModal;
