import { Calendar } from "lucide-react";
import { useState, useEffect } from "react";

const DateTimePicker = ({ title, required, value, onChange, id }) => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  // Si llega un valor inicial, dividilo
  useEffect(() => {
    if (value) {
      const [fecha, hora] = value.split("T");
      setDate(fecha);
      setTime(hora?.slice(0, 5)); // "HH:MM"
    }
  }, [value]);

  // Cuando cambia algo, avisale al padre
  useEffect(() => {
    if (date && time) {
      const combined = `${date}T${time}`;
      onChange && onChange(combined); // Llamar al padre
    }
  }, [date, time]);

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-sm font-semibold">
        {title}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="flex items-center gap-2 bg-gray-100 p-2 rounded-md w-fit">
        <Calendar className="w-5 h-5 text-gray-500" />
        <input
          type="date"
          id={`${id}-date`}
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required={required}
          className="bg-transparent px-2 py-1 rounded focus:outline-none cursor-pointer text-sm"
        />
        <input
          type="time"
          id={`${id}-time`}
          value={time}
          onChange={(e) => setTime(e.target.value)}
          required={required}
          className="bg-transparent px-2 py-1 rounded focus:outline-none cursor-pointer text-sm"
        />
      </div>
    </div>
  );
};

export default DateTimePicker;
