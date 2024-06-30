import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import axios from 'axios';
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const CumulativeIncomeExpenseLineChart = () => {

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

  const processCumulativeData = (transactions) => {
    // Sort transactions by date
    const sortedTransactions = transactions.sort((a, b) => new Date(a.date) - new Date(b.date));

    // Initialize cumulative totals
    let cumulativeIncome = 0;
    let cumulativeExpense = 0;

    // Initialize data arrays
    const labels = [];
    const incomeData = [];
    const expenseData = [];

    sortedTransactions.forEach((transaction) => {
      labels.push(new Date(transaction.date).toLocaleDateString());

      if (transaction.type === 'income') {
        cumulativeIncome += transaction.amount;
      } else {
        cumulativeExpense += transaction.amount;
      }

      incomeData.push(cumulativeIncome);
      expenseData.push(cumulativeExpense);
    });

    return {
      labels,
      datasets: [
        {
          label: 'Cumulative Income',
          data: incomeData,
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
        },
        {
          label: 'Cumulative Expense',
          data: expenseData,
          borderColor: 'rgba(255, 99, 132, 1)',
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
        },
      ],
    };
  };

  const chartData = processCumulativeData(transactions);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Cumulative Income vs. Expense Over Time',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div style={{ width: '1000px', height: '400px' }}>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default CumulativeIncomeExpenseLineChart;
