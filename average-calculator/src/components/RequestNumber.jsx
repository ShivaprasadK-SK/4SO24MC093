import { useState } from "react";
import "../App.css";
import React from "react";
import axios from "axios";

function RequestNumber() {
  const [id, setId] = useState("e");

  const handleInputChange = (event) => {
    const newValue = event.target.value;
    setId(newValue);
    callRequestNumbers();
  };

  const RequestNumbers = async () => {
    try {
      const response = await axios.post(`http://localhost:9876/numbers/${id}`, {
        headers: {
          Authorization: `Bearer ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzQ2ODcyNjMxLCJpYXQiOjE3NDY4NzIzMzEsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6ImUwNTM0YTNiLTRmZTMtNGI4NS04OTVjLTMxYzU5ZDI0MzZlMiIsInN1YiI6IjI0Y2EwMDk0LnNoaXZhcHJhc2FkQHNqZWMuYWMuaW4ifSwiZW1haWwiOiIyNGNhMDA5NC5zaGl2YXByYXNhZEBzamVjLmFjLmluIiwibmFtZSI6InNoaXZhcHJhc2FkIGsiLCJyb2xsTm8iOiI0c28yNG1jMDkzIiwiYWNjZXNzQ29kZSI6IktqSkF4UCIsImNsaWVudElEIjoiZTA1MzRhM2ItNGZlMy00Yjg1LTg5NWMtMzFjNTlkMjQzNmUyIiwiY2xpZW50U2VjcmV0IjoiZlJRcUdaR0JHZXdKUE1XUiJ9.KNBGwcvYsHHGvMB9D3ckk0hRDqsV3-ACzz6smQCM5Vk"}`,
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error posting data:", error);
      throw error;
    }
  };

  async function callRequestNumbers() {
    try {
      const responseData = await RequestNumbers();
      console.log("successfull:", responseData);
    } catch (error) {
      console.error("Failed:", error);
    }
  }

  return (
    <div>
      <input
        type="text"
        id="id"
        placeholder="Enter (p,f,e,r)"
        onChange={handleInputChange}
      ></input>
    </div>
  );
}

export default RequestNumber;
