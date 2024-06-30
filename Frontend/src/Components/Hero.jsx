import React from "react";
import Login from "./Login";

const Hero = () => {
  return (
    <div>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <div className="hidden sm:mb-8 sm:flex sm:justify-center">
              <div className="relative rounded-full px-3 text-sm leading-6 text-gray-400 ring-1 ">
                Discover More About Us by clicking here{" "}
                <a href="/about" className="font-semibold text-indigo-600">
                  <span className="absolute inset-0" aria-hidden="true"></span>Read
                  more <span aria-hidden="true">&rarr;</span>
                </a>
              </div>
            </div>
            <h1 className="text-5xl font-bold">
              Data to Enrich Your{" "}
              <span className="text-indigo-600">Financial Life</span>
            </h1>
            <p className="py-5">
              Our comprehensive personal finance dashboard empowers you to take
              control of your financial life, providing the tools you need to
              manage, analyze, and optimize your finances effortlessly.
            </p>
            <button
              className="btn btn-primary"
              onClick={() => document.getElementById("my_modal_2").showModal()}
            >
              Get Started
            </button>
            <Login />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
