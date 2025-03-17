import { useState } from "react";
import { fr } from "date-fns/locale";
import { addDays, format, subDays } from "date-fns";

export default function Calendar() {
 const [startDate, setStartDate] = useState<Date>(new Date());

 const days = Array.from({ length: 7 }, (_, i) => addDays(startDate, i));

 const goNextWeek = () => setStartDate(addDays(startDate, 7));
 const goPreviousWeek = () => setStartDate(subDays(startDate, 7));

 return (
  <div style={{ padding: "16px" }}>
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
     style={{ padding: "8px", cursor: "pointer" }}
    >
     &lt;
    </button>
    <button onClick={goNextWeek} style={{ padding: "8px", cursor: "pointer" }}>
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
      style={{ padding: "8px", border: "1px solid", borderRadius: "4px" }}
     >
      <div style={{ fontWeight: "bold" }}>
       {format(day, "EEE dd MMM", { locale: fr })}
      </div>
      <div style={{ marginTop: "8px" }}>
       <div
        style={{
         padding: "4px",
         borderRadius: "4px",
         marginBottom: "4px",
         backgroundColor: "#1a1a1a",
        }}
       >
        10:30
       </div>
      </div>
     </div>
    ))}
   </div>
  </div>
 );
}
