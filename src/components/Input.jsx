const Input = (props) => {
  return (
    <>
      <div className="text-sm font-medium text-gray-700">
        <label htmlFor={props.id}>
          {props.title}
          {props.required && <span className="text-red-500 text-bold"> *</span>}
        </label>
        <input
          required={props.required}
          placeholder={props.placeholder}
          name={props.name}
          onChange={props.onChange}
          value={props.value}
          id={props.id}
          type="text"
          className="w-full  bg-white border-1 border-gray-300 rounded-2xl shadow-lg px-4 py-3 flex items-center justify-between text-gray-900"
        />
      </div>
    </>
  );
};

export default Input;
