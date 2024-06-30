import React, { useState } from "react";

function LoanBasicForm() {
  const [inputs, setInputs] = useState({
    loanAmount: "",
    loanTerm: "",
    monthlyRepayment: "",
    annualInterest: "",
  });
  const [selectedOption, setSelectedOption] = useState("Monthly Repayment");
  const [loanDetails, setLoanDetails] = useState(null);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInputs({ ...inputs, [name]: value });
  };

  const calculateLoan = () => {
    const result = calculateLoanDetails(selectedOption, inputs);
    setLoanDetails(result);
  };

  const calculateLoanDetails = (selectedOption, inputs) => {
    let { loanAmount, loanTerm, monthlyRepayment, annualInterest } = inputs;

    annualInterest = parseFloat(annualInterest);
    loanAmount = parseFloat(loanAmount);
    loanTerm = parseFloat(loanTerm);
    monthlyRepayment = parseFloat(monthlyRepayment);
    console.log(annualInterest);
    console.log(loanAmount);
    console.log(loanTerm);
    console.log(monthlyRepayment);

    switch (selectedOption) {
      case "Loan Amount":
        const rateLA = annualInterest / 100 / 12;
        const nLA = loanTerm * 12;
        loanAmount =
          (monthlyRepayment * (1 - Math.pow(1 + rateLA, -nLA))) / rateLA;
        break;

      case "Loan Term":
        const rateLT = annualInterest / 100 / 12;
        const term =
          Math.log(
            monthlyRepayment / (monthlyRepayment - rateLT * loanAmount)
          ) / Math.log(1 + rateLT);
        loanTerm = term / 12;
        break;

      case "Monthly Repayment":
        const rateMR = annualInterest / 100 / 12;
        const nMR = loanTerm * 12;
        monthlyRepayment =
          (loanAmount * rateMR) / (1 - Math.pow(1 + rateMR, -nMR));
        break;

      case "Annual Interest":
        const guessRate = 0.05 / 12;
        const nAI = loanTerm * 12;
        let estimatedRate = guessRate;
        for (let i = 0; i < 10; i++) {
          const monthlyRepayEst =
            (loanAmount * estimatedRate) /
            (1 - Math.pow(1 + estimatedRate, -nAI));
          estimatedRate +=
            (monthlyRepayment - monthlyRepayEst) / (loanAmount * nAI);
        }
        annualInterest = estimatedRate * 12 * 100;
        break;

      default:
        return null;
    }

    const rate = annualInterest / 100 / 12;
    const n = loanTerm * 12;
    const totalRepayment = monthlyRepayment * n;
    const totalInterest = totalRepayment - loanAmount;

    return {
      monthlyRepayment: monthlyRepayment.toFixed(2),
      annualInterest: annualInterest.toFixed(2),
      loanTerm: loanTerm.toFixed(2),
      loanAmount: loanAmount.toFixed(2),
      totalInterest: totalInterest.toFixed(2),
      totalRepayment: totalRepayment.toFixed(2),
    };
  };

  return (
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
                        <div>
                          <h3
                            id="contact-info-heading"
                            className="text-lg font-semibold text-black"
                          >
                            What to Calculate?
                          </h3>
                          <br />
                          <div className="flex flex-col">
                            <label className="mb-2">
                              <input
                                type="radio"
                                value="Monthly Repayment"
                                checked={selectedOption === "Monthly Repayment"}
                                onChange={handleOptionChange}
                                className="mr-2 cursor-pointer"
                              />
                              Monthly Repayment(EMI)
                            </label>
                            <label className="mb-2">
                              <input
                                type="radio"
                                value="Loan Amount"
                                checked={selectedOption === "Loan Amount"}
                                onChange={handleOptionChange}
                                className="mr-2 cursor-pointer"
                              />
                              Loan Amount
                            </label>
                            <label className="mb-2">
                              <input
                                type="radio"
                                value="Annual Interest"
                                checked={selectedOption === "Annual Interest"}
                                onChange={handleOptionChange}
                                className="mr-2 cursor-pointer"
                              />
                              Annual Interest Rate(%)
                            </label>
                            <label className="mb-2">
                              <input
                                type="radio"
                                value="Loan Term"
                                checked={selectedOption === "Loan Term"}
                                onChange={handleOptionChange}
                                className="mr-2 cursor-pointer"
                              />
                              Loan Term
                            </label>
                          </div>
                        </div>
                        <hr className="my-4" />
                        {(() => {
                          switch (selectedOption) {
                            case "Monthly Repayment":
                              return (
                                <div>
                                  <div className="mt-1">
                                    <h3 className="text-lg font-semibold text-gray-900">
                                      Monthly Repayment Calculator
                                    </h3>

                                    <div className="mt-6 grid grid-cols-3 gap-x-4 gap-y-6 sm:grid-cols-4">
                                      <div className="col-span-3 sm:col-span-4">
                                        <label
                                          htmlFor="loanAmount"
                                          className="block text-sm font-medium text-gray-700"
                                        >
                                          Loan Amount
                                        </label>
                                        <div className="mt-1">
                                          <input
                                            className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                            type="text"
                                            placeholder="INR"
                                            onChange={handleInputChange}
                                            id="loanAmount"
                                            name="loanAmount"
                                          ></input>
                                        </div>
                                      </div>
                                      <div className="col-span-2 sm:col-span-3">
                                        <label
                                          htmlFor="annualInterest"
                                          className="block text-sm font-medium text-gray-700"
                                        >
                                          Annual Interest Rate (%)
                                        </label>
                                        <div className="mt-1">
                                          <input
                                            type="text"
                                            name="annualInterest"
                                            onChange={handleInputChange}
                                            id="annualInterest"
                                            placeholder="%"
                                            className="block h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                          />
                                        </div>
                                      </div>
                                      <div>
                                        <label
                                          htmlFor="loanTerm"
                                          className="block text-sm font-medium text-gray-700"
                                        >
                                          Loan Term
                                        </label>
                                        <div className="mt-1">
                                          <input
                                            type="text"
                                            onChange={handleInputChange}
                                            name="loanTerm"
                                            id="loanTerm"
                                            placeholder="in years"
                                            className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              );
                              break;
                            case "Loan Amount":
                              return (
                                <div>
                                  <div className="mt-1">
                                    <h3 className="text-lg font-semibold text-gray-900">
                                      Loan Amount Calculator
                                    </h3>

                                    <div className="mt-6 grid grid-cols-3 gap-x-4 gap-y-6 sm:grid-cols-4">
                                      <div className="col-span-3 sm:col-span-4">
                                        <label
                                          htmlFor="monthlyRepayment"
                                          className="block text-sm font-medium text-gray-700"
                                        >
                                          Monthly Repayment
                                        </label>
                                        <div className="mt-1">
                                          <input
                                            className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                            type="text"
                                            placeholder="INR"
                                            id="monthlyRepayment"
                                            onChange={handleInputChange}
                                            name="monthlyRepayment"
                                          ></input>
                                        </div>
                                      </div>
                                      <div className="col-span-2 sm:col-span-3">
                                        <label
                                          htmlFor="annualInterest"
                                          className="block text-sm font-medium text-gray-700"
                                        >
                                          Annual Interest Rate (%)
                                        </label>
                                        <div className="mt-1">
                                          <input
                                            type="text"
                                            name="annualInterest"
                                            onChange={handleInputChange}
                                            id="annualInterest"
                                            autoComplete="cc-exp"
                                            placeholder="%"
                                            className="block h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                          />
                                        </div>
                                      </div>
                                      <div>
                                        <label
                                          htmlFor="loanTerm"
                                          className="block text-sm font-medium text-gray-700"
                                        >
                                          Loan Term
                                        </label>
                                        <div className="mt-1">
                                          <input
                                            type="text"
                                            name="loanTerm"
                                            onChange={handleInputChange}
                                            id="loanTerm"
                                            placeholder="in years"
                                            className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              );
                            case "Annual Interest":
                              return (
                                <div>
                                  <div className="mt-1">
                                    <h3 className="text-lg font-semibold text-gray-900">
                                      Annual Interest Calculator
                                    </h3>

                                    <div className="mt-6 grid grid-cols-3 gap-x-4 gap-y-6 sm:grid-cols-4">
                                      <div className="col-span-3 sm:col-span-4">
                                        <label
                                          htmlFor="loanAmount"
                                          className="block text-sm font-medium text-gray-700"
                                        >
                                          Loan Amount
                                        </label>
                                        <div className="mt-1">
                                          <input
                                            className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                            type="text"
                                            placeholder="INR"
                                            onChange={handleInputChange}
                                            id="loanAmount"
                                            name="loanAmount"
                                          ></input>
                                        </div>
                                      </div>
                                      <div className="col-span-2 sm:col-span-3">
                                        <label
                                          htmlFor="monthlyRepayment"
                                          className="block text-sm font-medium text-gray-700"
                                        >
                                          Monthly Repayment
                                        </label>
                                        <div className="mt-1">
                                          <input
                                            type="text"
                                            name="monthlyRepayment"
                                            id="monthlyRepayment"
                                            onChange={handleInputChange}
                                            autoComplete="cc-exp"
                                            placeholder="%"
                                            className="block h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                          />
                                        </div>
                                      </div>
                                      <div>
                                        <label
                                          htmlFor="loanTerm"
                                          className="block text-sm font-medium text-gray-700"
                                        >
                                          Loan Term
                                        </label>
                                        <div className="mt-1">
                                          <input
                                            type="text"
                                            name="loanTerm"
                                            id="loanTerm"
                                            placeholder="in years"
                                            onChange={handleInputChange}
                                            className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              );
                            case "Loan Term":
                              return (
                                <div>
                                  <div className="mt-1">
                                    <h3 className="text-lg font-semibold text-gray-900">
                                      Loan Term Calculator
                                    </h3>

                                    <div className="mt-6 grid grid-cols-3 gap-x-4 gap-y-6 sm:grid-cols-4">
                                      <div className="col-span-3 sm:col-span-4">
                                        <label
                                          htmlFor="loanAmount"
                                          className="block text-sm font-medium text-gray-700"
                                        >
                                          Loan Amount
                                        </label>
                                        <div className="mt-1">
                                          <input
                                            className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                            type="text"
                                            placeholder="INR"
                                            onChange={handleInputChange}
                                            id="loanAmount"
                                            name="loanAmount"
                                          ></input>
                                        </div>
                                      </div>
                                      <div className="col-span-2 sm:col-span-3">
                                        <label
                                          htmlFor="annualInterest"
                                          className="block text-sm font-medium text-gray-700"
                                        >
                                          Annual Interest Rate (%)
                                        </label>
                                        <div className="mt-1">
                                          <input
                                            type="text"
                                            name="annualInterest"
                                            onChange={handleInputChange}
                                            id="annualInterest"
                                            placeholder="%"
                                            className="block h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                          />
                                        </div>
                                      </div>
                                      <div>
                                        <label
                                          htmlFor="monthlyRepayment"
                                          className="block text-sm font-medium text-gray-700"
                                        >
                                          EMI
                                        </label>
                                        <div className="mt-1">
                                          <input
                                            type="text"
                                            name="monthlyRepayment"
                                            onChange={handleInputChange}
                                            id="monthlyRepayment"
                                            placeholder="INR"
                                            className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              );

                            default:
                              break;
                          }
                        })()}

                        <div className="mt-10 flex justify-end border-t border-gray-200 pt-6">
                          <button
                            type="button"
                            onClick={calculateLoan}
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
                  {loanDetails && (
                    <div>
                      <p className="flex justify-between">
                        <span className="text-black font-semibold text-base">
                          Principal Paid/ Loan Amount(P):
                        </span>
                        <span className="text-base">{loanDetails.loanAmount}</span>
                      </p>
                      <p className="flex justify-between">
                        <span className="text-black font-semibold text-base">
                          Interest Paid(I):
                        </span>
                        <span className="text-base">{loanDetails.totalInterest}</span>
                      </p>
                      <p className="flex justify-between">
                        <span className="text-black font-semibold text-base">
                          Total Repayment(P+I):
                        </span>
                        <span className="text-base">{loanDetails.totalRepayment}</span>
                      </p>
                      <p className="flex justify-between">
                        <span className="text-black font-semibold text-base">
                          Monthly Repayment:
                        </span>
                        <span className="text-base">{loanDetails.monthlyRepayment}</span>
                      </p>
                      <p className="flex justify-between">
                        <span className="text-black font-semibold text-base">
                          Annual Interest Rate(%):
                        </span>
                        <span className="text-base">{loanDetails.annualInterest}</span>
                      </p>
                      <p className="flex justify-between">
                        <span className="text-black font-semibold text-base">
                          Loan Term(T):
                        </span>
                        <span className="text-base">{loanDetails.loanTerm}</span>
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
  );
}

export default LoanBasicForm;
