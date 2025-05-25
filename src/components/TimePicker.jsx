const TimePicker = (props) => {
  return (
    <div className="flex flex-col gap-1 mt-4">
      <label htmlFor={props.id} className="text-sm font-semibold">
        {props.title}
        {props.required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div>
        <p className="inline mr-4">Desde:</p>
        <input
          type="time"
          id={`${props.id}-time`}
          className="px-2 py-1 rounded outline outline-gray-400 cursor-pointer text-sm"
          />
        <p className="inline mx-4">Hasta:</p>
        <input
          type="time"
          id={`${props.id}-time`}
          className="px-2 py-1 rounded outline outline-gray-400 cursor-pointer text-sm"
        />
      </div>
    </div>
  )

}

export default TimePicker;