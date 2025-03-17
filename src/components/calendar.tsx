import { useEffect, useState } from "react";

import { fr } from "date-fns/locale";
import { addDays, format, subDays } from "date-fns";

const generateRandomSlots = () => {
 const slots = [];
 const numSlots = Math.floor(Math.random() * 10) + 1;
 for (let i = 0; i < numSlots; i++) {
  const hour = Math.floor(Math.random() * 10) + 8;
  const minute = Math.random() > 0.5 ? "00" : "30";
  slots.push(`${hour}:${minute}`);
 }
 return slots.sort((a, b) => {
  const [hourA, minuteA] = a.split(":").map(Number);
  const [hourB, minuteB] = b.split(":").map(Number);

  return hourA - hourB || minuteA - minuteB;
 });
};

export default function Calendar() {
 const [startDate, setStartDate] = useState<Date>(new Date());
 const [slots, setSlots] = useState<Record<string, string[]>>({});
 const [selectedSlots, setSelectedSlots] = useState<{ [key: string]: number }>(
  {}
 );

 const days = Array.from({ length: 7 }, (_, i) => addDays(startDate, i));

 useEffect(() => {
  const newSlots: Record<string, string[]> = {};
  for (let i = 0; i < 7; i++) {
   const day = addDays(startDate, i);
   newSlots[day.toISOString()] = generateRandomSlots();
  }
  setSlots(newSlots);
 }, [startDate]);

 const goNextWeek = () => setStartDate(addDays(startDate, 7));
 const goPreviousWeek = () => setStartDate(subDays(startDate, 7));

 const handleSlotClick = (day: string, slot: string) => {
  const key = `${day}-${slot}`;
  setSelectedSlots((prev) => ({
   ...prev,
   [key]: (prev[key] || 0) + 1 > 3 ? 0 : (prev[key] || 0) + 1,
  }));
 };

 const getSlotColor = (state: number) => {
  switch (state) {
   case 1:
    return "#000";
   case 2:
    return "#008000";
   case 3:
    return "#0000FF";
   default:
    return "#F5F5F5";
  }
 };

 return (
  <div style={{ padding: "16px", fontFamily: "Arial, sans-serif" }}>
   <div
    style={{
     display: "flex",
     justifyContent: "space-between",
     marginBottom: "16px",
    }}
   >
    <button
     onClick={goPreviousWeek}
     disabled={startDate <= new Date()}
     style={{
      padding: "8px",
      cursor: "pointer",
      background: "none",
      border: "none",
      fontSize: "18px",
     }}
    >
     &lt;
    </button>
    <button
     onClick={goNextWeek}
     style={{
      padding: "8px",
      cursor: "pointer",
      background: "none",
      border: "none",
      fontSize: "18px",
     }}
    >
     &gt;
    </button>
   </div>
   <div
    style={{
     display: "grid",
     gridTemplateColumns: "repeat(7, 1fr)",
     gap: "8px",
    }}
   >
    {days.map((day) => (
     <div
      key={day.toISOString()}
      style={{ padding: "8px", textAlign: "center" }}
     >
      <div style={{ fontWeight: "bold", marginBottom: "8px" }}>
       <p style={{ fontWeight: "normal" }}>
        {format(day, "EEE", { locale: fr })}
       </p>
       {format(day, "dd MMM", { locale: fr })}
      </div>
      <div>
       {slots[day.toISOString()]?.map((slot) => (
        <div
         key={slot}
         onClick={() => handleSlotClick(day.toISOString(), slot)}
         style={{
          padding: "8px",
          backgroundColor: getSlotColor(
           selectedSlots[`${day.toISOString()}-${slot}`] || 0
          ),
          borderRadius: "4px",
          marginBottom: "4px",
          textAlign: "center",
          cursor: "pointer",
          color: selectedSlots[`${day.toISOString()}-${slot}`]
           ? "#fff"
           : "#000",
         }}
        >
         {slot}
        </div>
       ))}
      </div>
     </div>
    ))}
   </div>
  </div>
 );
}
