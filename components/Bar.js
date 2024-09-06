"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { Bar } from "react-chartjs-2"; // Use the Bar component directly

ChartJS.register(BarElement, CategoryScale, LinearScale);

const BarChart = () => {
  const [barData, setBarData] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8000/barchart-data/")
      .then((response) => {
        console.log("Bar Chart Data:", response.data);
        setBarData(response.data);
      })
      .catch((error) => console.error("Bar Chart Error:", error));
  }, []);

  const data = {
    labels: barData?.labels || [],
    datasets: [
      {
        label: "Bar Chart",
        data: barData?.data || [],
      },
    ],
  };

  if (!barData) return <div>Loading...</div>; // Adding a loading state

  return (
    <div className="mr-20 ml-20">
      <h1>Bar Chart</h1>
      <Bar data={data} />
    </div>
  );
};

export default BarChart;
