import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import axios from "axios";

const timeRanges = [5, 15, 30, 60]; // in minutes

const calculateAverage = (data) => {
  const sum = data.reduce((acc, item) => acc + item.price, 0);
  const avg = sum / data.length;
  return data.map((item) => ({ ...item, avg }));
};

export default function StockChart() {
  const [selectedRange, setSelectedRange] = useState(15);
  const [priceData, setPriceData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const selectedStock = {
    name: "ACME Corp",
    ticker: "ACME",
  };

  useEffect(() => {
    const fetchStockData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          "http://20.244.56.144/evaluation-service/stocks",
          {
            headers: {
              Authorization: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzQ2ODc0NjcwLCJpYXQiOjE3NDY4NzQzNzAsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6ImUwNTM0YTNiLTRmZTMtNGI4NS04OTVjLTMxYzU5ZDI0MzZlMiIsInN1YiI6IjI0Y2EwMDk0LnNoaXZhcHJhc2FkQHNqZWMuYWMuaW4ifSwiZW1haWwiOiIyNGNhMDA5NC5zaGl2YXByYXNhZEBzamVjLmFjLmluIiwibmFtZSI6InNoaXZhcHJhc2FkIGsiLCJyb2xsTm8iOiI0c28yNG1jMDkzIiwiYWNjZXNzQ29kZSI6IktqSkF4UCIsImNsaWVudElEIjoiZTA1MzRhM2ItNGZlMy00Yjg1LTg5NWMtMzFjNTlkMjQzNmUyIiwiY2xpZW50U2VjcmV0IjoiZlJRcUdaR0JHZXdKUE1XUiJ9.5viRmpafW4XxZEa4XuOTNvkWkF5aEvQmhXxndgjn6-A`,
            },
          }
        );
        console.log(response.data);
      } catch (err) {
        console.error("Error fetching stock data:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStockData();
  }, [selectedRange]);

  return (
    <div className="p-4 bg-white rounded-lg shadow-md w-full">
      <h2 className="text-xl font-semibold mb-4">
        Stock Chart - {selectedStock.ticker}
      </h2>

      <div className="flex gap-2 mb-4">
        {timeRanges.map((min) => (
          <button
            key={min}
            onClick={() => setSelectedRange(min)}
            className={`px-4 py-2 rounded ${
              selectedRange === min ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
          >
            Last {min}m
          </button>
        ))}
      </div>

      {/* Chart */}
      {isLoading ? (
        <p>Loading chart...</p>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={priceData}>
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="time" />
            <YAxis domain={["dataMin - 5", "dataMax + 5"]} />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="price"
              stroke="#8884d8"
              name="Price"
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="avg"
              stroke="#82ca9d"
              name="Average"
              strokeDasharray="5 5"
            />
          </LineChart>
        </ResponsiveContainer>
      )}

      {/* Stock Summary */}
      <div className="mt-6 p-4 bg-gray-100 rounded">
        <h3 className="text-lg font-medium">
          {selectedStock.name} ({selectedStock.ticker})
        </h3>
        {priceData.length > 0 && (
          <>
            <p>
              Current Price: ${priceData[priceData.length - 1].price.toFixed(2)}
            </p>
            <p>
              Average (last {selectedRange}m): ${priceData[0].avg.toFixed(2)}
            </p>
          </>
        )}
      </div>
    </div>
  );
}
