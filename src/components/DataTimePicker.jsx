import { Calendar } from "lucide-react";

const DateTimePicker = (props) => {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={props.id} className="text-sm font-semibold">
        {props.title}
        {props.required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="flex items-center gap-2 bg-gray-100 p-2 rounded-md w-fit">
        <Calendar className="w-5 h-5 text-gray-500" />
        <input
          type="date"
          id={`${props.id}-date`}
          className="bg-transparent px-2 py-1 rounded focus:outline-none cursor-pointer text-sm"
        />
        <input
          type="time"
          id={`${props.id}-time`}
          className="bg-transparent px-2 py-1 rounded focus:outline-none cursor-pointer text-sm"
        />
      </div>
    </div>
  );
};

export default DateTimePicker;