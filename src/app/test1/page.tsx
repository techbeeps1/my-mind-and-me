"use client";
import { useState, useEffect } from "react";

export default function BookingPage() {
  const [date, setDate] = useState("");
  const [slots, setSlots] = useState([]);

  useEffect(() => {
    if (!date) return;

    fetch(`/api/slots?date=${date}`)
      .then(res => res.json())
      .then(data => setSlots(data.slots));
  }, [date]);

  return (
    <div>
      <h2>Select Date</h2>
      <input type="date" onChange={(e) => setDate(e.target.value)} />

      <h2>Available Slots</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10 }}>
        {slots.map((slot, i) => (
          <button key={i} onClick={() => bookSlot(slot)}>
            {slot}
          </button>
        ))}
      </div>
    </div>
  );
}

async function bookSlot(slot) {
  await fetch("/api/book", {
    method: "POST",
    body: JSON.stringify({ slot }),
  });
}