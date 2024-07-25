import React, { useState } from "react";

const MonthlyIncomeScheme = () => {
  const [futureAmount, setFutureAmount] = useState(null);

  function showFutureAmount() {
    const amount = document.getElementById("monthly_amount").value;
    const interest = parseFloat(
      document.getElementById("monthly_interest").value
    );

    const cost = parseFloat(amount);

    if (cost < 1000) {
      toast.error("Amount should be greater than Rs. 1000");
      return;
    }
    if (cost % 1000 != 0) {
      toast.error("Amount should be in multiples of 1000");
      return;
    }
    if (cost > 900000 != 0) {
      toast.error("Amount should be less than Rs. 9 lakhs");
      return;
    }

    setFutureAmount(calculateMonthlyInterest(cost, interest));
  }

  function calculateMonthlyInterest(deposit, annualInterestRate) {
    const amount = (deposit*(annualInterestRate/12))/100;

    return amount;
  }

  return (
    <div>
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
                                  Monthly Income Scheme Calculator
                                </h3>

                                <div className="mt-6 grid grid-cols-3 gap-x-4 gap-y-6 sm:grid-cols-4">
                                  <div className="col-span-3 sm:col-span-4">
                                    <label
                                      htmlFor="monthly_amount"
                                      className="block text-sm font-medium text-gray-700"
                                    >
                                      Lump Sum Deposit Amount
                                    </label>
                                    <div className="mt-1">
                                      <input
                                        className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                        type="text"
                                        placeholder="INR"
                                        id="monthly_amount"
                                        name="monthly_amount"
                                      ></input>
                                    </div>
                                  </div>
                                  <div className="col-span-2 sm:col-span-3">
                                    <label
                                      htmlFor="monthly_interest"
                                      className="block text-sm font-medium text-gray-700"
                                    >
                                      Annual Interest Rate(%)
                                    </label>
                                    <div className="mt-1">
                                      <input
                                        type="text"
                                        name="monthly_interest"
                                        id="monthly_interest"
                                        placeholder="7.4% currently"
                                        className="block h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-black focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div>
                                  <label
                                    htmlFor="term"
                                    className="block text-sm mt-6 font-medium text-gray-700"
                                  >
                                    Term
                                  </label>
                                  <div className="mt-1">
                                    <input
                                      type="text"
                                      name="term"
                                      id="term"
                                      disabled
                                      placeholder="5 years"
                                      className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-black focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="mt-10 flex justify-end border-t border-gray-200 pt-6">
                              <button
                                type="button"
                                onClick={showFutureAmount}
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
                      {futureAmount && (
                        <div>
                          <p className="flex justify-between">
                            <span className="text-black font-semibold text-base">
                              Monthly Interest:
                            </span>
                            <span className="text-base">
                              Rs. {futureAmount.toFixed(2)}
                            </span>
                          </p>
                          <p className="flex justify-between">
                            <span className="text-black font-semibold text-base">
                              Total Interest:
                            </span>
                            <span className="text-base">
                              Rs.{" "}
                              {(futureAmount*60).toFixed(2)}
                            </span>
                          </p>
                          <p className="flex justify-between">
                            <span className="text-black font-semibold text-base">
                              Total Amount(Interest + Deposit):
                            </span>
                            <span className="text-base">
                              Rs.{" "}
                              {(
                                futureAmount*60 +
                                parseFloat(
                                  document.getElementById("monthly_amount").value
                                )
                              ).toFixed(2)}
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
    </div>
  );
};

export default MonthlyIncomeScheme;
