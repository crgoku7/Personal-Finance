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
import BudgetModal from "./BudgetModal";

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
      <div>
        <button
          onClick={() => document.getElementById("budget_modal").showModal()}
          className="hover:shadow-form w-full rounded-md bg-[#6A64F1] py-3 px-20 text-center text-base font-semibold text-white outline-none"
        >
          Add a budget
        </button>
        <BudgetModal />
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
