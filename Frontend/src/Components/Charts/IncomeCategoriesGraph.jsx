import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import React, { useEffect, useState } from "react";
import axios from "axios";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ExpenseCategoriesChart = () => {

  const [transactions, setTransactions] = useState([]);
  useEffect(() => {
    const getTransactions = async () => {
      try {
        const res = await axios.get(
          "http://localhost:4000/incomeExpense/incomeExpenseGet"
        );
        const email = JSON.parse(localStorage.getItem("Users")).email;
        const requiredData = res.data.filter((data) => data.email === email);
        const updatedData = requiredData.map((item) => {
          const datePart = item.date.split("T")[0];
          const date = new Date(datePart);
          const options = { day: "numeric", month: "long", year: "numeric" };
          const formattedDate = date.toLocaleDateString("en-GB", options);
          return { ...item, date: formattedDate };
        });
        setTransactions(updatedData);
      } catch (error) {
        console.log("Error", error);
      }
    };
    getTransactions();
  }, []);

  const expenseData = transactions.filter((item) => item.type === "income");

  const aggregatedData = expenseData.reduce((acc, item) => {
    const category = item.name;
    const amount = parseFloat(item.amount);
    if (!acc[category]) {
      acc[category] = 0;
    }
    acc[category] += amount;
    return acc;
  }, {});

  const chartData = {
    labels: Object.keys(aggregatedData),
    datasets: [
      {
        label: "Amount",
        data: expenseData.map((item) =>
          parseFloat(item.amount)
        ),
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Income Breakdown",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};

export default ExpenseCategoriesChart;
