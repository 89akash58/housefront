"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  TimeScale,
} from "chart.js";
import {
  CandlestickController,
  CandlestickElement,
} from "chartjs-chart-financial";
import { Chart } from "react-chartjs-2";
import "chartjs-adapter-date-fns";

ChartJS.register(
  CategoryScale,
  LinearScale,
  TimeScale,
  CandlestickController,
  CandlestickElement
);

const CandlestickChart = () => {
  const [chartData, setChartData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8000/candlestick-data/")
      .then((response) => {
        console.log("Candlestick Data:", response.data);
        if (response.data && Array.isArray(response.data.data)) {
          setChartData(response.data.data);
        } else {
          setError("Data format is incorrect");
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Candlestick Error:", error);
        setError(error.message);
        setIsLoading(false);
      });
  }, []);

  const options = {
    responsive: true,
    scales: {
      x: {
        type: "time",
        time: {
          unit: "day",
        },
      },
      y: {
        type: "linear",
      },
    },
  };

  const data = chartData
    ? {
        datasets: [
          {
            label: "Candlestick Chart",
            data: chartData.map((d) => ({
              x: new Date(d.x),
              o: d.open,
              h: d.high,
              l: d.low,
              c: d.close,
            })),
            type: "candlestick",
          },
        ],
      }
    : null;

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!chartData) return <div>No data available</div>;

  return (
    <div className=" mr-20 ml-20 mb-20">
      <h1>Candlestick</h1>
      <Chart type="candlestick" options={options} data={data} />
    </div>
  );
};

export default CandlestickChart;
