// ExpensePieChart.js
import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
ChartJS.register(ArcElement, Tooltip, Legend);

import axios from 'axios';

const ExpenseCategoriesPieChart = () => {

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

  const aggregateExpensesByCategory = (transactions) => {
    const expenseCategories = transactions
      .filter(item => item.type === 'income')
      .reduce((acc, item) => {
        if (!acc[item.name]) {
          acc[item.name] = 0;
        }
        acc[item.name] += item.amount;
        return acc;
      }, {});

    return {
      labels: Object.keys(expenseCategories),
      datasets: [
        {
          label: 'Expenses',
          data: Object.values(expenseCategories),
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(199, 199, 199, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(199, 199, 199, 1)'
          ],
          borderWidth: 1,
        },
      ],
    };
  };

  const chartData = aggregateExpensesByCategory(transactions);

  return (
    <div style={{width:'400px', height:'400px'}}>
      <Pie data={chartData} />
    </div>
  );
};

export default ExpenseCategoriesPieChart;