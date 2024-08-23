import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Card } from 'react-bootstrap';

// 注册 Chart.js 的组件
ChartJS.register(ArcElement, Tooltip, Legend);

function PieChart({ cars, detailed = false }) {
  let data;

  if (detailed) {
    // 详细显示：展示每个品牌下车型的数量分布
    const modelData = cars.reduce((acc, car) => {
      const label = `${car.brand} - ${car.model}`;
      acc[label] = (acc[label] || 0) + car.quantity; // 基于数量
      return acc;
    }, {});

    data = {
      labels: Object.keys(modelData),
      datasets: [
        {
          data: Object.values(modelData),
          backgroundColor: Object.keys(modelData).map(() => '#' + Math.floor(Math.random() * 16777215).toString(16)),
        },
      ],
    };
  } else {
    // 总体显示：展示品牌的数量分布
    const brandData = cars.reduce((acc, car) => {
      acc[car.brand] = (acc[car.brand] || 0) + car.quantity; // 基于数量
      return acc;
    }, {});

    data = {
      labels: Object.keys(brandData),
      datasets: [
        {
          data: Object.values(brandData),
          backgroundColor: Object.keys(brandData).map(() => '#' + Math.floor(Math.random() * 16777215).toString(16)),
        },
      ],
    };
  }

  const options = {
    plugins: {
      legend: detailed ? { display: false } : { position: 'top' }, // 移除detailed模式下的图例
    },
  };

  return (
    <Card>
      <Card.Body>
        <Pie data={data} options={options} key={`pie-chart-${Math.random()}`} />
      </Card.Body>
    </Card>
  );
}

export default PieChart;
