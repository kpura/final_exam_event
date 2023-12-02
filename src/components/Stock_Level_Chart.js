import React from 'react';
import { Line } from 'react-chartjs-2';

const Stock_Level_Chart = ({ products }) => {
  const chartData = {
    labels: products.map((product) => product.name),
    datasets: [
      {
        label: 'Stock Level',
        data: products.map((product) => product.stock),
        fill: false,
        borderColor: 'rgba(41,134,204)',
        borderWidth: 2,
        pointRadius: 5,
        pointHitRadius: 10,
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

  return <Line data={chartData} options={options} />;
};

export default Stock_Level_Chart;
