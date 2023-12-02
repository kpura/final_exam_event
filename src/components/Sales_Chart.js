import React from 'react';
import { Bar } from 'react-chartjs-2';

const Sales_Chart = ({ transactions }) => {
  const salesData = transactions.reduce((acc, transaction) => {
    const productName = transaction.name;

    if (!acc[productName]) {
      acc[productName] = 0;
    }

    acc[productName] += transaction.quantity;

    return acc;
  }, {});

  const chartData = {
    labels: Object.keys(salesData),
    datasets: [
      {
        label: 'Sales',
        data: Object.values(salesData),
        backgroundColor: 'rgba(245,85,74)',
        borderColor: 'rgba(245,85,74)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        type: 'category',
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};

export default Sales_Chart;
