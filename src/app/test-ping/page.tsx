"use client";

import { useEffect } from "react";

export default function Home() {
  const API_URL = "/api/patient/all";

  const sendData = async () => {
    try {
      const response = await fetch(API_URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.text();
      console.log("Response:", result);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    // Call immediately
    sendData();

    // Call every 15 seconds
    const interval = setInterval(sendData, 15000);

    // Cleanup on unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Sending data every 15 seconds...</h2>
    </div>
  );
}