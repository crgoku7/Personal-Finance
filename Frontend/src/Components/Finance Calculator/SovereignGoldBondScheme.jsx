import React, { useState } from "react";

const SovereignGoldBondScheme = () => {
  const [futureAmount, setFutureAmount] = useState(null);

  function showFutureAmount() {
    const price = parseFloat(document.getElementById("gold_price").value);
    const weight = parseFloat(document.getElementById("grams").value);
    const interest = parseFloat(document.getElementById("gold_interest").value);
    const cost = price * weight;

    setFutureAmount(calculateHalfYearlyInterest(cost, interest));
  }

  function calculateHalfYearlyInterest(deposit, annualInterestRate) {
    return (deposit * annualInterestRate) / 2 / 100;
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
                                  Sovereign Gold Bond Calculator
                                </h3>

                                <div className="mt-6 grid grid-cols-3 gap-x-4 gap-y-6 sm:grid-cols-4">
                                  <div className="col-span-3 sm:col-span-4">
                                    <label
                                      htmlFor="gold_price"
                                      className="block text-sm font-medium text-gray-700"
                                    >
                                      Current market price of 1 gram of pure
                                      gold
                                    </label>
                                    <div className="mt-1">
                                      <input
                                        className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                        type="text"
                                        placeholder="Rs. 7471 in June-2024"
                                        id="gold_price"
                                        name="gold_price"
                                      ></input>
                                    </div>
                                  </div>
                                  <div className="col-span-2 sm:col-span-3">
                                    <label
                                      htmlFor="gold_interest"
                                      className="block text-sm font-medium text-gray-700"
                                    >
                                      Annual Interest Rate(%)
                                    </label>
                                    <div className="mt-1">
                                      <input
                                        type="text"
                                        name="gold_interest"
                                        id="gold_interest"
                                        placeholder="2.5% currently"
                                        className="block h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-black focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className="col-span-2 sm:col-span-3">
                                  <label
                                    htmlFor="grams"
                                    className="block text-sm mt-6 font-medium text-gray-700"
                                  >
                                    How many grams of gold do you want to
                                    purchase?
                                  </label>
                                  <div className="mt-1">
                                    <input
                                      type="text"
                                      name="grams"
                                      id="grams"
                                      placeholder="1 to 4000 grams"
                                      className="block h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-black focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                    />
                                  </div>
                                </div>
                                <div>
                                  <label
                                    htmlFor="gold_term"
                                    className="block text-sm mt-6 font-medium text-gray-700"
                                  >
                                    Term
                                  </label>
                                  <div className="mt-1">
                                    <input
                                      type="text"
                                      name="gold_term"
                                      id="gold_term"
                                      disabled
                                      placeholder="8 years"
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
                              Deposit Amount:
                            </span>
                            <span className="text-base">
                              Rs.{" "}
                              {parseFloat(
                                document.getElementById("gold_price").value
                              ) *
                                parseFloat(
                                  document.getElementById("grams").value
                                )}
                            </span>
                          </p>
                          <p className="flex justify-between">
                            <span className="text-black font-semibold text-base">
                              Half-yearly Interest:
                            </span>
                            <span className="text-base">
                              Rs. {futureAmount.toFixed(2)}
                            </span>
                          </p>
                          <p className="flex justify-between">
                            <span className="text-black font-semibold text-base">
                              Total Interest Recieved:
                            </span>
                            <span className="text-base">
                              Rs. {(futureAmount * 16).toFixed(2)}
                            </span>
                          </p>
                          <hr className="my-4" />
                          <p className="flex justify-between">
                            <span className="text-base">
                              1. You need to deposit Rs.{" "}
                              {parseFloat(
                                document.getElementById("gold_price").value
                              ) *
                                parseFloat(
                                  document.getElementById("grams").value
                                )}{" "}
                              to buy {document.getElementById("grams").value}{" "}
                              grams of gold bond.
                            </span>
                          </p>
                          <p className="flex justify-between">
                            <span className="text-base">
                              2. You will recieve interest amount of Rs.{" "}
                              {futureAmount.toFixed(2)} every 6 months.
                            </span>
                          </p>
                          <p className="flex justify-between">
                            <span className="text-base">
                              3. You will be recieving a total interest amount
                              of Rs. {(futureAmount * 16).toFixed(2)} during the
                              term of 8 years.
                            </span>
                          </p>
                          <p className="flex justify-between">
                            <span className="text-base">
                              4. At the end of 8 years, you will get the
                              maturity amount. The maturity amount will be the
                              market price of{" "}
                              {parseFloat(
                                document.getElementById("grams").value
                              )}{" "}
                              grams of gold at the end of 8 years.
                            </span>
                          </p>
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

export default SovereignGoldBondScheme;
