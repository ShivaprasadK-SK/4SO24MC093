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

  
}
