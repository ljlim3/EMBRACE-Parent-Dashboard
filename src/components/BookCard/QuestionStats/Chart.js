import React, { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import "chartjs-plugin-labels";
import "./chart.css";

function Chart(readingData) {
  const [chartData, setChartData] = useState({});
  let numQuestions = [];
  let total = 0;

  Object.keys(readingData).forEach((key) => {
    numQuestions.push(readingData[key].abstract);
    numQuestions.push(readingData[key].concrete);
    numQuestions.push(readingData[key].relational);
  });

  numQuestions.map((data) => (total += data));

  const data = () => {
    setChartData({
      labels: ["Abstract", "Relational", "Concrete"],
      datasets: [
        {
          label: "I asked",
          data: numQuestions,
          backgroundColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)"
          ],
          borderwidth: 1
        }
      ]
    });
  };

  useEffect(() => {
    data();
  }, []);

  const options = {
    title: {
      display: true,
      text: "I asked",
      fontSize: 20
    },
    legend: {
      display: false
    },
    animation: {
      animateRotate: true
    },
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      labels: [
        {
          render: "label",
          position: "outside",
          fontSize: 12,
          textMargin: 3
        },
        {
          render: "value",
          fontColor: "#000"
        }
      ]
    }
  };

  return (
    <div className="pie-chart">
      <div className="center">
        <span>Total</span>
        <p>{total}</p>
      </div>
      <Doughnut data={chartData} width={180} options={options} />
    </div>
  );
}

export default Chart;
