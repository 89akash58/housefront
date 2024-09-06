"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  Chart as ChartJS,
  LineElement,
  PointElement, // Import PointElement
  CategoryScale,
  LinearScale,
} from "chart.js";
import { Line } from "react-chartjs-2"; // Import Line from react-chartjs-2 directly for clarity

ChartJS.register(
  LineElement,
  PointElement, // Register PointElement
  CategoryScale,
  LinearScale
);

const LineChart = () => {
  const [lineData, setLineData] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8000/linechart-data/")
      .then((response) => setLineData(response.data))
      .catch((error) => console.error(error));
  }, []);

  const data = {
    labels: lineData?.labels || [], // Ensure you are using labels if your chart needs them
    datasets: [
      {
        label: "Line Chart",
        data: lineData?.data || [],
        borderColor: "rgb(75, 192, 192)", // Adding some color for visibility
        fill: false, // Specify if the area under the line should be filled
      },
    ],
  };

  return (
    <div className="mr-20 ml-20">
      <h1>Line Chart</h1>
      <Line data={data} />
    </div>
  );
};

export default LineChart;
