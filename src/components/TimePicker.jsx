const TimePicker = ({ titulo, value, onChange, required = false, id }) => {
  return (
    <div className="flex flex-col">
      {titulo && (
        <label htmlFor={id} className="mb-1 font-semibold">
          {titulo}
        </label>
      )}
      <input
        type="time"
        id={id}
        value={value}
        onChange={onChange}
        required={required}
        className="border rounded px-2 py-1"
      />
    </div>
  );
};

export default TimePicker;
