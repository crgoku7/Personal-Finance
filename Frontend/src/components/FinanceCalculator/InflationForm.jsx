import React, { useState } from "react";

const InflationForm = () => {
  const [futurePrice, setFuturePrice] = useState(null);

  function showFuturePrice() {
    const currentCost = document.getElementById("cost").value;
    const inflationRate = document.getElementById("inflationRate").value;
    const years = document.getElementById("term").value;

    const cost = parseFloat(currentCost);
    const rate = parseFloat(inflationRate);
    const time = parseInt(years, 10);

    setFuturePrice(calculateFuturePrice(cost, rate, time));
  }

  function calculateFuturePrice(currentCost, inflationRate, years) {
    const rate = inflationRate / 100;
    const futurePrice = currentCost * Math.pow(1 + rate, years);

    return futurePrice;
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
                                Inflation Calculator
                              </h3>

                              <div className="mt-6 grid grid-cols-3 gap-x-4 gap-y-6 sm:grid-cols-4">
                                <div className="col-span-3 sm:col-span-4">
                                  <label
                                    htmlFor="cost"
                                    className="block text-sm font-medium text-gray-700"
                                  >
                                    Current Cost of an item
                                  </label>
                                  <div className="mt-1">
                                    <input
                                      className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                      type="text"
                                      placeholder="INR"
                                      id="cost"
                                      name="cost"
                                    ></input>
                                  </div>
                                </div>
                                <div className="col-span-2 sm:col-span-3">
                                  <label
                                    htmlFor="inflationRate"
                                    className="block text-sm font-medium text-gray-700"
                                  >
                                    Expexted Annual Inflation Rate(%)
                                  </label>
                                  <div className="mt-1">
                                    <input
                                      type="text"
                                      name="inflationRate"
                                      id="inflationRate"
                                      placeholder="5.70% in 2023"
                                      className="block h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                    />
                                  </div>
                                </div>
                                <div>
                                  <label
                                    htmlFor="term"
                                    className="block text-sm font-medium text-gray-700"
                                  >
                                    Terms
                                  </label>
                                  <div className="mt-1">
                                    <input
                                      type="text"
                                      name="term"
                                      id="term"
                                      placeholder="in years"
                                      className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="mt-10 flex justify-end border-t border-gray-200 pt-6">
                            <button
                              type="button"
                              onClick={showFuturePrice}
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
                    {futurePrice && (
                      <div>
                        <p className="flex justify-between">
                          <span className="text-black font-semibold text-base">
                            Future Price:
                          </span>
                          <span className="text-base">Rs. {futurePrice}</span>
                        </p>
                        <hr className="my-4"/>
                        <p className="text-base">
                          If the cost of an item is Rs.{" "}
                          {document.getElementById("cost").value} today, then
                          the same item would cost Rs. {futurePrice} after{" "}
                          {document.getElementById("term").value} years.
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
  );
};

export default InflationForm;
