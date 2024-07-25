import React, { useState } from "react";
import toast from "react-hot-toast";

const ageCategories = [
  "Less than a year",
  "1 Year",
  "2 Years",
  "3 Years",
  "4 Years",
  "5 Years",
  "6 Years",
  "7 Years",
  "8 Years",
  "9 Years",
];

const SukanyaSamriddhiForm = () => {
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const [maturityAmount, setMaturityAmount] = useState(null);

  function showMaturityAmount() {
    const amount = document.getElementById("amount").value;
    const interest = document.getElementById("interest").value;

    const cost = parseFloat(amount);
    const interest_rate = parseFloat(interest)

    if (cost * 12 < 250) {
      toast.error("Amount should be greater than Rs. 250 in financial year");
      return;
    }
    if (cost * 12 > 150000) {
      toast.error("Amount should be less than Rs. 1.5 lakhs in financial year");
      return;
    }
    if ((cost * 12) % 50 != 0) {
      toast.error("Amount should be in multiple of 50 in financial year");
      return;
    }

    setMaturityAmount(calculateMaturityAmount(cost, interest_rate));
  }

  function calculateMaturityAmount(monthlyDeposit, annualInterestRate) {
    const depositPeriodYears = 15;
    const totalPeriodYears = 21;

    const monthlyInterestRate = annualInterestRate / 12 / 100;
    const totalMonths = depositPeriodYears * 12;
    const totalMonthsWithInterest = totalPeriodYears * 12;

    let futureValueDeposits = 0;
    for (let i = 0; i < totalMonths; i++) {
      futureValueDeposits += monthlyDeposit * Math.pow(1 + monthlyInterestRate, totalMonths - i);
    }

    const remainingYears = totalPeriodYears - depositPeriodYears;
    const maturityAmount = futureValueDeposits * Math.pow(1 + annualInterestRate / 100, remainingYears);
  
    return maturityAmount.toFixed(2);
  }

  return (
    <div>
      <div className="mt-20">
        <div className="mx-auto my-4 max-w-4xl md:my-6">
          <div className="overflow-hidden rounded-xl shadow bg-white">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="px-5 py-6 text-gray-900 md:px-8">
                <div className="flow-root">
                  <div className="-my-6 divide-y divide-gray-200">
                    <div className="py-6">
                      <form>
                        <div className="mx-auto max-w-2xl px-4 lg:max-w-none lg:px-0">
                          <hr className="my-4" />
                          <div>
                            <div className="mt-1">
                              <h3 className="text-lg font-semibold text-gray-900">
                                Sukanya Samriddhi Calculator
                              </h3>

                              <div className="mt-6 grid grid-cols-3 gap-x-4 gap-y-6 sm:grid-cols-4">
                                <div className="col-span-3 sm:col-span-4">
                                  <label
                                    htmlFor="amount"
                                    className="block text-sm font-medium text-gray-700"
                                  >
                                    Deposit Amount(Monthly)
                                  </label>
                                  <div className="mt-1">
                                    <input
                                      className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                      type="text"
                                      placeholder="INR"
                                      id="amount"
                                      name="amount"
                                    ></input>
                                  </div>
                                </div>
                                <div className="col-span-2 sm:col-span-3">
                                  <label
                                    htmlFor="age"
                                    className="block text-sm font-medium text-gray-700"
                                  >
                                    Girl Child's Age
                                  </label>
                                  <div className="mt-1">
                                    <select
                                      id="age"
                                      value={selectedCategory}
                                      onChange={handleChange}
                                      className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                      <option
                                        value=""
                                        disabled
                                        className="bg-white"
                                      >
                                        -- Select an option --
                                      </option>
                                      {ageCategories.map((category, index) => (
                                        <option
                                          key={index}
                                          value={category}
                                          className="bg-white"
                                        >
                                          {category}
                                        </option>
                                      ))}
                                    </select>
                                  </div>
                                </div>
                              </div>
                              <div>
                                <label
                                  htmlFor="interest"
                                  className="block text-sm mt-6 font-medium text-gray-700"
                                >
                                  Annual Interest Rate(%)
                                </label>
                                <div className="mt-1">
                                  <input
                                    type="text"
                                    name="interest"
                                    id="interest"
                                    placeholder="8.2% currently"
                                    className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-black focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                  />
                                </div>
                              </div>
                              <div className="flex">
                                <div>
                                  <label
                                    htmlFor="deposit_term"
                                    className="block text-sm mt-6 font-medium text-gray-700"
                                  >
                                    Deposit Period
                                  </label>
                                  <div className="mt-1">
                                    <input
                                      type="text"
                                      name="deposit_term"
                                      id="deposit_term"
                                      disabled
                                      placeholder="15 Years"
                                      className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-black focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                    />
                                  </div>
                                </div>
                                <div>
                                  <label
                                    htmlFor="maturity_term"
                                    className="block text-sm mt-6 font-medium text-gray-700"
                                  >
                                    Maturity Period
                                  </label>
                                  <div className="mt-1">
                                    <input
                                      type="text"
                                      name="maturity_term"
                                      id="maturity_term"
                                      disabled
                                      placeholder="21 Years"
                                      className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-black focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="mt-10 flex justify-end border-t border-gray-200 pt-6">
                            <button
                              type="button"
                              onClick={showMaturityAmount}
                              className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                            >
                              Calculate
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-100 px-5 py-6 md:px-8">
                <div className="flow-root">
                  <div className="flex flex-col gap-3 border-b py-6 text-xs justify-center">
                    <hr className="my-4" />
                    {maturityAmount && (
                      <div>
                        <p className="flex justify-between">
                          <span className="text-black font-semibold text-base">
                            Maturity Amount:
                          </span>
                          <span className="text-base">Rs. {maturityAmount}</span>
                        </p>
                        <p className="flex justify-between">
                          <span className="text-black font-semibold text-base">
                            Total Deposits:
                          </span>
                          <span className="text-base">
                            Rs. {parseFloat(document.getElementById("amount").value)*12*15}
                          </span>
                        </p>
                        <p className="flex justify-between">
                          <span className="text-black font-semibold text-base">
                            Total Interest:
                          </span>
                          <span className="text-base">
                            Rs.{" "}
                            {(maturityAmount -
                              parseFloat(
                                document.getElementById("amount").value
                              )*12*15).toFixed(2)}
                          </span>
                        </p>
                        <hr className="my-4" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SukanyaSamriddhiForm;
