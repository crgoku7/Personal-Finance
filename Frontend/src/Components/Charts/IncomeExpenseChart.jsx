import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
import axios from 'axios';

const IncomeExpenseChart = () => {

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

  const processIncomeExpense = (transactions) => {
    let totalIncome = 0;
    let totalExpense = 0;

    transactions.forEach((transaction) => {
      if (transaction.type === 'income') {
        totalIncome += transaction.amount;
      } else if (transaction.type === 'expense') {
        totalExpense += transaction.amount;
      }
    });

    return {
      labels: ['Income', 'Expense'],
      datasets: [
        {
          label: 'Amount',
          data: [totalIncome, totalExpense],
          backgroundColor: [
            'rgba(75, 192, 192, 0.6)',
            'rgba(255, 99, 132, 0.6)',
          ],
          borderColor: [
            'rgba(75, 192, 192, 1)',
            'rgba(255, 99, 132, 1)',
          ],
          borderWidth: 1,
        },
      ],
    };
  };

  const chartData = processIncomeExpense(transactions);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Income vs. Expense',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      <Bar style={{height: "200px"}} data={chartData} options={options} />
    </div>
  );
};

export default IncomeExpenseChart;
