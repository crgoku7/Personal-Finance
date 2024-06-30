import React, { useEffect, useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import DatePicker from "react-datepicker";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-datepicker/dist/react-datepicker.css";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import enUS from "date-fns/locale/en-US";
import axios from "axios";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const locales = {
  "en-US": enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const CustomEvent = ({ event }) => (
  <span>
    <strong>{event.title}</strong>
    <br />
    Amount: Rs. {event.amount}
  </span>
);

const eventStyleGetter = (event) => {
  const style = {
    backgroundColor: event.color,
    color: "black",
    borderRadius: "4px",
    border: "none",
    display: "block",
  };
  return {
    style,
  };
};

const CalendarSection = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [newEvent, setNewEvent] = useState({
    title: "",
    start: "",
    end: "",
    amount: "",
    type: "",
    email: "",
  });
  const [allEvents, setAllEvents] = useState([]);

  useEffect(() => {
    const getBudgetData = async () => {
      try {
        const res = await axios.get("http://localhost:4000/budget/budgetGet");
        const email = JSON.parse(localStorage.getItem("Users")).email;
        const requiredData = res.data
          .filter((item) => item.email === email)
          .map((item) => ({
            ...item,
            start: new Date(item.date),
            end: new Date(item.date),
            color: item.type === "Income" ? "#81C784" : "#E57373",
          }));
        setAllEvents(requiredData);
      } catch (error) {
        console.log("Error", error);
      }
    };
    getBudgetData();
  }, []);

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
    <div className="ml-64">
      <div className="flex items-center justify-center ">
        <div className="mx-auto w-full max-w-[550px] bg-white">
          <form className="py-6 px-9" onSubmit={handleSubmit(onSubmit)}>
            <div className="sm:col-span-3">
              <label
                htmlFor="category"
                className="mb-3 block text-base font-medium text-[#07074D]"
              >
                Type:
              </label>
              <div className="mb-5">
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
              </div>
            </div>
            <div className="mb-5">
              <label
                htmlFor="title"
                className="mb-3 block text-base font-medium text-[#07074D]"
              >
                Title:
              </label>
              <input
                type="text"
                name="title"
                id="title"
                value={newEvent.title}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, title: e.target.value })
                }
                placeholder="Enter the title"
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="budget_date"
                className="mb-3 block text-base font-medium text-[#07074D]"
              >
                Date:
              </label>
              <DatePicker
                className="bg-white w-full rounded-md border mb-2 border-[#e0e0e0] py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                placeholder="Select Date"
                id="budget_date"
                selected={newEvent.start}
                onChange={(date) =>
                  setNewEvent({ ...newEvent, start: date, end: date })
                }
              />
              <label
                htmlFor="budget_amount"
                className="mb-3 block text-base font-medium text-[#07074D]"
              >
                Amount:
              </label>
              <input
                type="number"
                className="bg-white w-full rounded-md border border-[#e0e0e0] py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                placeholder="Add amount"
                id="budget_amount"
                value={newEvent.amount}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, amount: e.target.value })
                }
              />
            </div>
            <div>
              <button
                type="submit"
                className="hover:shadow-form w-full rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none"
              >
                Add the budget
              </button>
            </div>
          </form>
        </div>
      </div>
      <div>
        <Calendar
          localizer={localizer}
          events={allEvents}
          startAccessor="start"
          endAccessor="end"
          eventPropGetter={eventStyleGetter}
          className="bg-white text-black rounded-md"
          style={{ height: 700, margin: "50px" }}
          components={{
            event: CustomEvent,
          }}
        />
      </div>
    </div>
  );
};

export default CalendarSection;