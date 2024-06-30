import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);
import axios from 'axios';

const MonthlySavings = () => {

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

  const processMonthlySavings = (transactions) => {
    // Initialize a map to store monthly income and expenses
    const monthlyData = {};

    transactions.forEach((transaction) => {
      const date = new Date(transaction.date);
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      const key = `${year}-${month}`;

      if (!monthlyData[key]) {
        monthlyData[key] = { income: 0, expense: 0 };
      }

      if (transaction.type === 'income') {
        monthlyData[key].income += transaction.amount;
      } else {
        monthlyData[key].expense += transaction.amount;
      }
    });

    // Calculate monthly savings and sort by date
    const sortedKeys = Object.keys(monthlyData).sort((a, b) => new Date(a) - new Date(b));
    const labels = sortedKeys.map(key => key);
    const savingsData = sortedKeys.map(key => monthlyData[key].income - monthlyData[key].expense);

    return {
      labels,
      datasets: [
        {
          label: 'Monthly Savings',
          data: savingsData,
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
        },
      ],
    };
  };

  const chartData = processMonthlySavings(transactions);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Monthly Savings',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div style={{ width: '600px', height: '400px' }}>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default MonthlySavings;
