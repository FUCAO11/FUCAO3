import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Card } from 'react-bootstrap';

// 注册 Chart.js 的组件
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function StackedBarChart({ cars }) {
  // 准备数据
  const brands = [...new Set(cars.map(car => car.brand))];
  const models = [...new Set(cars.map(car => car.model))];

  const brandData = brands.map(brand => {
    return models.map(model => {
      const car = cars.find(car => car.brand === brand && car.model === model);
      return car ? car.quantity : 0;
    });
  });

  const data = {
    labels: models,
    datasets: brands.map((brand, index) => ({
      label: brand,
      data: brandData[index],
      backgroundColor: '#' + Math.floor(Math.random() * 16777215).toString(16),
    })),
  };

  const options = {
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Model Distribution within Brands',
      },
    },
  };

  return (
    <Card>
      <Card.Body>
        <Bar data={data} options={options} key={`bar-chart-${Math.random()}`} />
      </Card.Body>
    </Card>
  );
}

export default StackedBarChart;
