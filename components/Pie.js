"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, CategoryScale, Tooltip, Legend);

const PieChart = () => {
  const [chartData, setChartData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/piechart-data/"
        );
        console.log("Pie Chart Data:", response.data);
        setChartData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Pie Chart Error:", error);
        setError("Failed to fetch pie chart data");
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!chartData || !chartData.labels || !chartData.data)
    return <div>No data available</div>;

  const data = {
    labels: chartData.labels,
    datasets: [
      {
        label: "Pie Chart",
        data: chartData.data,
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
        ],
      },
    ],
  };

  return (
    <div className="mr-20 ml-20">
      <h1>Pie chart</h1>
      <Pie data={data} />
    </div>
  );
};

export default PieChart;
