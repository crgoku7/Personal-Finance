import React from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const FinanceCalculator = (props) => {
  return (
    <div className="px-2 py-2 md:px-6 md:py-10 mt-10">
      <h1 className="text-2xl font-bold capitalize text-white lg:text-3xl">
        {props.info.heading}
      </h1>
      <p className="my-2 text-gray-400">{props.info.headingText}</p>
      <hr />
      <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 xl:mt-12 xl:grid-cols-6 xl:gap-16">
        {Array.from({ length: parseInt(props.info.number) }).map((_, i) => (
          <div key={i} className="space-y-3">
            <span className="inline-block rounded-full bg-gray-100 p-3 text-black">
              <p className="text-base font-black">{props.info.subHeading[i]}</p>
            </span>
            <h1 className="text-xl font-semibold capitalize text-white">
              {props.info.subHeadingText[i]}
            </h1>
            <p className="text-sm text-gray-400"></p>
            <a
              href="#"
              className="-mx-1 inline-flex transform items-center text-sm font-semibold capitalize text-white transition-colors duration-300 hover:underline"
            >
              <Link to={props.info.paths[i]} className="mx-1">Check it out!</Link>
              <ArrowRight size={16} />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FinanceCalculator;
