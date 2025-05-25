const Input = (props) => {
  return (
    <>
      <div className="mb-2 text-sm font-medium text-gray-700 mt-4 ">
        <label htmlFor={props.id}>
          {props.title}
          {props.required && <span className="text-red-500 text-bold"> *</span>}
        </label>
        <input
          required={props.required}
          placeholder={props.placeholder}
          id={props.id}
          type="text"
          className="w-full max-w-sm bg-white border-1 border-gray-300 rounded-2xl shadow-lg px-4 py-3 flex items-center justify-between text-gray-900"
        />
      </div>
    </>
  );
};

export default Input;
